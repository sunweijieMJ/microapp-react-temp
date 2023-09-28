import * as XLSX from 'xlsx';
import { splitArray } from '@/utils/tools/global';

/**
 * 将以点拼接的扁平字符串对象，解析为具有深度的对象
 * @param dotStrObj 点拼接的扁平化字符串对象
 * @returns 具有深度的对象
 */
function parseDotStrObjToObj(dotStrObj: any) {
  const resultObj: any = {};
  Object.keys(dotStrObj).forEach((key) => {
    const keys = key.split('.');
    keys.reduce((resultObj, curValue, currentIndex) => {
      resultObj[curValue] =
        currentIndex === keys.length - 1
          ? dotStrObj[key]
          : resultObj[curValue] || {};
      return resultObj[curValue];
    }, resultObj);
  });
  return resultObj;
}

/**
 * 将具有深度的对象扁平化，变成以点拼接的扁平字符串对象
 * @param targetObj 具有深度的对象
 * @returns 扁平化后，由点操作符拼接的对象
 */
function transformObjToDotStrObj(targetObj: any) {
  const resultObj: any = {};
  function transform(currentObj: any, preKeys: any) {
    Object.keys(currentObj).forEach((key) => {
      if (
        Object.prototype.toString.call(currentObj[key]) !== '[object Object]'
      ) {
        resultObj[[...preKeys, key].join('.')] = currentObj[key];
      } else {
        transform(currentObj[key], [...preKeys, key]);
      }
    });
  }
  transform(targetObj, []);
  return resultObj;
}

/**
 * 获取所有单元格数据
 * @param sheet sheet 对象
 * @returns 该 sheet 所有单元格数据
 */
function getSheetCells(sheet: any) {
  if (!sheet || !sheet['!ref']) {
    return [];
  }
  const range = XLSX.utils.decode_range(sheet['!ref']);

  const allCells = [];
  for (let rowIndex = range.s.r; rowIndex <= range.e.r; ++rowIndex) {
    const newRow: any = [];
    allCells.push(newRow);
    for (let colIndex = range.s.c; colIndex <= range.e.c; ++colIndex) {
      const cell =
        sheet[
          XLSX.utils.encode_cell({
            c: colIndex,
            r: rowIndex,
          })
        ];
      let cellContent = '';
      if (cell && cell.t) {
        cellContent = XLSX.utils.format_cell(cell);
      }
      newRow.push(cellContent);
    }
  }
  return allCells;
}

/**
 * 获取表头任意层级单元格合并后的表格内容解析
 * @param sheet 一个 sheet 中所有单元格内容
 * @param textKeyMap 表头中文与对应英文 key 之间的映射表
 * @returns antdv 中的表格 column，dataSource，以及转化后的，直接传输给后端的 json 对象数组
 */
function getSheetHeaderAndData(sheet: any, textKeyMap: any) {
  // 获取菜单项在 Excel 中所占行数
  function getHeaderRowNum(textKeyMap: any) {
    let maxLevel = 1; // 最高层级
    Object.keys(textKeyMap).forEach((textStr) => {
      maxLevel = Math.max(maxLevel, textStr.split('.').length);
    });
    return maxLevel;
  }
  const headerRowNum = getHeaderRowNum(textKeyMap);

  const headerRows = sheet.slice(0, headerRowNum);
  const dataRows = sheet.slice(headerRowNum);

  const headerColumns: any[] = []; // 收集 table 组件中，表头 columns 的对象数组结构
  const lastHeaderLevelColumns: any[] = []; // 最近一个 columns，用于收集单元格子表头的内容
  const textValueMaps: any[] = []; // 以中文字符串为 key 的对象数组，用于收集表格中的数据
  const columnIndexObjMap: any[] = []; // 表的列索引，对应在对象中的位置，用于后续获取表格数据时，快速定位每一个单元格

  for (let colIndex = 0; colIndex < headerRows[0].length; colIndex++) {
    const headerCellList = headerRows.map((item: any) => item[colIndex]);
    headerCellList.forEach((headerCell: any, headerCellIndex: any) => {
      // 如果当前单元格没数据，这证明是合并后的单元格，跳过其处理
      if (!headerCell) {
        return;
      }
      const tempColumn = { title: headerCell };

      columnIndexObjMap[colIndex] = tempColumn; // 通过 columnIndexObjMap 记录每一列数据，对应到那个对象中，实现一个映射表

      // 如果表头数据第一轮就有值，这证明这是新起的一个表头项目，往 headerColumns 中，新加入一条数据
      if (headerCellIndex === 0) {
        headerColumns.push(tempColumn);
        lastHeaderLevelColumns[headerCellIndex] = tempColumn; // 记录当前层级，最新的一个表格容器，可能在下一列数据时合并单元格，下一个层级需要往该容器中添加数据
      } else {
        // 不是第一列数据，这证明是子项目，需要加入到上一层表头的 children 项，作为其子项目
        lastHeaderLevelColumns[headerCellIndex - 1].children =
          lastHeaderLevelColumns[headerCellIndex - 1].children || [];
        lastHeaderLevelColumns[headerCellIndex - 1].children.push(tempColumn);
        lastHeaderLevelColumns[headerCellIndex] = tempColumn; // 记录当前层级的容器索引，可能再下一层级中使用到
      }
    });
  }

  // 以 headerColumns 为对象结构模板，遍历 excel 表数据中的所有数据，并利用 columnIndexObjMap 的映射，快速填充每一项数据
  dataRows.forEach((dataRow: any) => {
    dataRow.forEach((value: any, index: any) => {
      columnIndexObjMap[index].value = value;
    });
    const titleObj = Object.create(headerColumns); // columnIndexObjMap 的指针索引，仅指向 headerColumns，以 headerColumns 为数据模板，复制一份数据，获得数据填充后的效果对象
    textValueMaps.push(transformListToObj(titleObj)); // 将 listObj 对象转化化普通的对象
  });

  const newHeaderColumns = setHeaderColumnDataIndex(
    headerColumns,
    [],
    textKeyMap
  );

  const dataList = splitArray<any>(textValueMaps, (list) => {
    return [...transformTextToKey(list, textKeyMap)];
  });
  const dataSource = dataList.map((row: any) => transformObjToDotStrObj(row)); // 将 JSON 对象转化为 “点.” 拼接的扁平对象，使得数据与 headerColumn 中的 dataIndex 相对应。实现 table 的数据填充

  return {
    headerColumns: newHeaderColumns,
    dataList,
    dataSourceList: dataSource,
  };
}

// 将以数组形式记录的对象信息，转化为正常的对象结构
function transformListToObj(listObjs: any) {
  const resultObj: any = {};
  listObjs.forEach((item: any) => {
    if (item.value) {
      resultObj[item.title] = item.value;
      return;
    }

    if (item.children && item.children.length > 0) {
      resultObj[item.title] = transformListToObj(item.children);
    }
  });
  return resultObj;
}

// 根据表头的 title 值，从 textKeyMap 中寻找映射关系，设置 headerColumn 对应的 dataIndex
function setHeaderColumnDataIndex(
  headerColumns: any,
  preTitle: any,
  textKeyMap: any
) {
  headerColumns.forEach((headerObj: any) => {
    if (headerObj.children) {
      headerObj.children = setHeaderColumnDataIndex(
        headerObj.children,
        [...preTitle, headerObj.title],
        textKeyMap
      );
    } else {
      const titleStr = [...preTitle, headerObj.title].join('.');
      headerObj.dataIndex = textKeyMap[titleStr];
    }
  });
  return headerColumns;
}

// 将以中文为 key 的对象，通过 textKeyMap 映射，找到对应的 key，转化为以 key 对键的对象，转化为后端对应的 json 对象
function transformTextToKey(textDataList: any[], textKeyMap: any) {
  const textDotStrDataList = textDataList.map((obj: any) =>
    transformObjToDotStrObj(obj)
  );
  let textDotStrDataListStr = JSON.stringify(textDotStrDataList);
  Object.keys(textKeyMap).forEach((text) => {
    const key = textKeyMap[text];
    textDotStrDataListStr = textDotStrDataListStr.replaceAll(
      `"${text}"`,
      `"${key}"`
    ); // 在这里，通过字符串的替换，实现表头数据层级结构，与实际对象将数据结构的转换
  });
  const keyDotStrDataList: any[] = JSON.parse(textDotStrDataListStr);
  const keyDataList = keyDotStrDataList.map((keyDotStrData: any) =>
    parseDotStrObjToObj(keyDotStrData)
  );
  return keyDataList;
}

export { getSheetCells, getSheetHeaderAndData };
