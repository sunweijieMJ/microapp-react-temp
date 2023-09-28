import * as XLSX from 'xlsx';
import { transformDataToSheetCells } from './exportCore';
import type { ISheetTemp } from '@/interface';

declare let self: DedicatedWorkerGlobalScope;
export {};

self.addEventListener('message', async (evt) => {
  const initialValues = evt.data.initialValues;
  const exportList: ISheetTemp[] = evt.data.exportList;

  const sheetTemps = exportList.filter((item) =>
    initialValues.sheetType.includes(item.key)
  );

  const sheetList = sheetTemps.map((item) => {
    // 调用函数，将数据源转化为 Excel 单元格数据，及 Excel 表头合并单元格配置
    const { headerMerges, cells } = transformDataToSheetCells(
      item.sheetData,
      item.sheetKeyMaps
    );

    // 转化为 Excel 后的所有单元格数据
    // console.log('cells', cells);
    // 转化为 Excel 后的表头合并单元格配置
    // console.log('headerMerges', headerMerges);

    const worksheet = XLSX.utils.aoa_to_sheet(cells);
    worksheet['!merges'] = headerMerges;

    // 设置表头样式
    const headerStyle = {
      alignment: {
        horizontal: 'center', // 水平居中
        vertical: 'center', // 垂直居中
        wrapText: true, // 自动换行
      },
    };
    // 所有单元格居中显示
    Object.keys(worksheet).forEach((cell) => {
      if (cell[0] === '!') return;
      const col = cell.substring(0, 1);
      if (Number.isNaN(col)) return;
      const row = parseInt(cell.substring(1), 10);
      if (row) {
        worksheet[cell].s = headerStyle;
      }
    });

    return {
      sheetName: item.sheetName,
      sheetData: worksheet,
    };
  });

  self.postMessage({
    sheetList,
  });
  self.close();
});

export default null as any;
