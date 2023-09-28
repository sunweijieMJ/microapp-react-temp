export type IPosition = {
  x: number;
  y: number;
};

/**
 * 经纬度
 */
export type ILatLngs = {
  lat: number;
  lng: number;
} & IPosition;

export enum SheetName {
  '点位级数据对账表',
  '点位建设信息表',
  '重点场所信息表',
  '警情信息表',
  '警格基础信息表',
  '警格结果表',
  '网格结果表',
  '区域人流阀值表',
}

/**
 * 表格模版表头映射
 */
export type ISheetKeyMaps = {
  [key: string]: string;
};

/**
 * 表格模版数据
 */
export type ISheetData = {
  [key: string]: any;
};

/**
 * 表格模版
 */
export type ISheetTemp = {
  key: string;
  sheetName: keyof typeof SheetName;
  sheetKeyMaps: ISheetKeyMaps[];
  sheetData: ISheetData[];
};
