import localforage from 'localforage';
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx';
import { getSheetCells, getSheetHeaderAndData } from './importCore';
import type { SheetData, SheetType } from './index';
import type { ILatLngs, ISheetTemp } from '@/interface';

declare let self: DedicatedWorkerGlobalScope;
export {};

// 获取表头映射
const getTextKeyMap = (importList: ISheetTemp[], sheet: SheetType) => {
  const textKeyMap: Record<string, string> = {};
  const keyMaps = importList.find(
    (wItem) => wItem.sheetName === sheet.sheetName
  )?.sheetKeyMaps;
  keyMaps?.forEach((item) => {
    Object.keys(item).forEach((key) => {
      textKeyMap[key] = item[key];
    });
  });

  return textKeyMap;
};

// 解析经纬度边界数组
const getLngLats = (item: any) => {
  let lngLats = [];
  try {
    lngLats = JSON.parse(item.lngLatBoundary)
      .flat()
      .map((item: ILatLngs) => {
        return {
          ...item,
          x: item.lng,
          y: item.lat,
        };
      });
  } catch (error) {
    console.log(`警格基础信息表${item.policeGridName}JSON格式有误`);
  }

  return lngLats;
};

// 插入并转换excel数据
const handleExcelData = (sheet: SheetType, dataList: SheetData[]) => {
  let newDataList: SheetData[] = [];
  if (sheet.sheetName === '点位建设信息表') {
    newDataList = dataList.map((item) => {
      const longitude = +item.longitude;
      const latitude = +item.latitude;
      return {
        ...item,
        id: item.id ?? uuidv4(),
        pointType: 1,
        longitude,
        latitude,
        x: longitude,
        y: latitude,
      };
    });
  } else if (sheet.sheetName === '重点场所信息表') {
    newDataList = dataList.map((item) => {
      const longitude = +item.longitude;
      const latitude = +item.latitude;
      return {
        ...item,
        id: item.id ?? uuidv4(),
        pointType: 2,
        longitude,
        latitude,
        x: longitude,
        y: latitude,
      };
    });
  } else if (sheet.sheetName === '警情信息表') {
    newDataList = dataList.map((item) => {
      const longitude = +item.longitude;
      const latitude = +item.latitude;
      return {
        ...item,
        id: item.id ?? uuidv4(),
        pointType: 3,
        longitude,
        latitude,
        x: longitude,
        y: latitude,
      };
    });
  } else if (sheet.sheetName === '警格基础信息表') {
    newDataList = dataList.map((item) => {
      return {
        ...item,
        id: item.id ?? uuidv4(),
        lngLats: getLngLats(item),
      };
    });
  } else {
    newDataList = dataList.map((item) => {
      return {
        ...item,
        id: item.id ?? uuidv4(),
      };
    });
  }

  return newDataList;
};

self.addEventListener('message', async (evt) => {
  const file = evt.data.file;
  const importList = evt.data.importList;

  const reader = new FileReader();
  reader.onload = async (e) => {
    const sheets = [];
    const data = e.target && e.target.result;
    const workbook = XLSX.read(data, {
      type: 'array',
    });
    for (const sheetName of workbook.SheetNames) {
      const worksheet = workbook.Sheets[sheetName];
      sheets.push({
        sheetName,
        sheetData: getSheetCells(worksheet),
      });
    }

    try {
      await Promise.all(
        sheets.map(async (sheet) => {
          const textKeyMap = getTextKeyMap(importList, sheet);
          const { dataList } = getSheetHeaderAndData(
            sheet.sheetData,
            textKeyMap
          );
          const newDataList = handleExcelData(sheet, dataList);

          return localforage.setItem(sheet.sheetName, newDataList);
        })
      );
    } catch (error) {
      console.error(error);
      console.log('解析出错，请检查 textKeyMap 是否为正确的 JSON 数据');
    }

    self.postMessage({});
    self.close();
  };
  reader.readAsArrayBuffer(file);
});

export default null as any;
