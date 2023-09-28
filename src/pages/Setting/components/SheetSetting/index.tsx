import { Button, message } from 'antd';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import Sheet from '@/components/Sheet';
import {
  pointType1AccountSheet,
  pointType1Sheet,
  pointType2Sheet,
  pointType3Sheet,
  policeGridSheet,
} from '@/components/Sheet/excelTemp';
import type { IRefSheet } from '@/components/Sheet/index';

const basicSheetList = [
  pointType1Sheet,
  pointType1AccountSheet,
  pointType2Sheet,
  policeGridSheet,
  pointType3Sheet,
];

interface IProps {
  className?: string;
}

const SheetSetting: React.FC<IProps> = function (props) {
  const { className } = props;

  const [basicImportLoading, setBasicImportLoading] = useState(false);
  const [basicExportLoading, setBasicExportLoading] = useState(false);

  const basicSheetRef = useRef<IRefSheet>(null);

  const onBasicImportChange = async () => {
    message.success('导入成功');
  };

  const downloadBasicSheet = async () => {
    basicSheetRef?.current?.exportExcel(basicSheetList, '基础信息模版表');
  };

  return (
    <div className={classNames(className)}>
      <Sheet
        ref={basicSheetRef}
        sheetTemp={basicSheetList}
        setImportLoading={setBasicImportLoading}
        setExportLoading={setBasicExportLoading}
        exportSlot={
          <Button
            disabled={basicExportLoading}
            loading={basicExportLoading}
            onClick={downloadBasicSheet}
          >
            导出
          </Button>
        }
        importSlot={
          <Button
            disabled={basicImportLoading}
            loading={basicImportLoading}
            onClick={() => {
              basicSheetRef?.current?.importExcel();
            }}
          >
            上传
          </Button>
        }
        onImportChange={onBasicImportChange}
      />
    </div>
  );
};

export default SheetSetting;
