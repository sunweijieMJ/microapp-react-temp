import { App, Space } from 'antd';
import classNames from 'classnames';
import React, { useImperativeHandle, useRef } from 'react';
import { toStyleXlsx } from './exportCore';
import ExportExcelWorker from './exportExcel.worker';
import ImportExcelWorker from './importExcel.worker';
import cssModule from './index.module.scss';
import type { ISheetTemp } from '@/interface';

interface IProps {
  sheetTemp: ISheetTemp[];
  importSlot?: React.ReactNode;
  exportSlot?: React.ReactNode;
  setImportLoading?: (loading: boolean) => void;
  setExportLoading?: (loading: boolean) => void;
  onImportChange?: () => void;
  onExportChange?: () => void;
}

export type SheetData = any;
export type SheetType = {
  sheetName: string;
  sheetData: SheetData[];
};
export interface IRefSheet {
  importExcel: () => void;
  exportExcel: (exportList?: ISheetTemp[], sheetName?: string) => void;
}

const Sheet = React.forwardRef<IRefSheet, IProps>((props, ref) => {
  const {
    sheetTemp,
    importSlot,
    exportSlot,
    setImportLoading,
    setExportLoading,
    onImportChange,
    onExportChange,
  } = props;

  const { message } = App.useApp();

  const inputFileBasicRef = useRef<HTMLInputElement>(null); // 导入文件el对象

  const initialValues = {
    sheetType: sheetTemp.map((item) => item.key),
  };

  useImperativeHandle(ref, () => ({
    importExcel: () => {
      inputFileBasicRef.current?.click();
    },
    exportExcel: (exportList = sheetTemp, sheetName = '模版示例') => {
      exportBasicExcel(exportList, sheetName);
    },
  }));

  const onImportFileChange = (evt: { target: HTMLInputElement }) => {
    importBasicExcel(evt, sheetTemp);
  };

  // 导出基础信息模版
  const exportBasicExcel = (exportList: ISheetTemp[], sheetName: string) => {
    if (setExportLoading) setExportLoading(true);

    const worker = new ExportExcelWorker();
    worker.addEventListener('message', (evt: any) => {
      if (onExportChange) onExportChange();
      if (setExportLoading) setExportLoading(false);
      const sheetList = evt.data.sheetList;
      console.log('sheetList', sheetList);
      toStyleXlsx(`${sheetName}.xlsx`, sheetList);
    });
    worker.postMessage({
      exportList,
      initialValues,
    });
  };

  // 导入基础信息模版
  const importBasicExcel = (
    evt: { target: HTMLInputElement },
    importList: ISheetTemp[]
  ) => {
    const file = evt.target.files?.[0];
    if (!file) {
      message.warning('文件不存在');
      return;
    }

    if (setImportLoading) setImportLoading(true);
    const worker = new ImportExcelWorker();
    worker.addEventListener('message', () => {
      if (onImportChange) onImportChange();
      if (setImportLoading) setImportLoading(false);
      // fix同一文件无法选中
      evt.target.value = '';
    });
    worker.postMessage({
      file,
      importList,
    });
  };

  return (
    <div className={classNames(cssModule.SheetWrap)}>
      <Space>
        {exportSlot}
        {importSlot}
        <input
          ref={inputFileBasicRef}
          type="file"
          style={{ display: 'none' }}
          onChange={onImportFileChange}
          accept=".xls,.xlsx"
        />
      </Space>
    </div>
  );
});

Sheet.defaultProps = {
  importSlot: undefined,
  exportSlot: undefined,
  setImportLoading: undefined,
  setExportLoading: undefined,
  onImportChange: undefined,
  onExportChange: undefined,
};

export default Sheet;
