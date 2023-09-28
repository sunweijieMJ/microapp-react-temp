import { App, Button, Form, Space } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import cssModule from './index.module.scss';
import CodeEditor from '@/components/CodeEditor';
import { globalConfigSelector } from '@/redux/selector/global';
import { isJsonString } from '@/utils/tools/global';

interface IProps {
  className?: string;
}

const GlobalSetting: React.FC<IProps> = function (props) {
  const { className } = props;

  const { message } = App.useApp();
  const [form] = Form.useForm();

  const globalConfig = useSelector(globalConfigSelector);
  const [mapInfo, setMapInfo] = useState(globalConfig);

  useEffect(() => {
    form.setFieldsValue(globalConfig);
  }, [form, globalConfig]);

  // 修改地图配置JSON
  const onMapSettingChange = (str: string) => {
    if (isJsonString(str)) {
      const mapValue = JSON.parse(str);
      setMapInfo(mapValue);
    } else {
      message.warning('JSON格式有误');
    }
  };

  const onFinish = (values: any) => {
    console.log('values', values);
  };

  const onReset = () => {
    form.setFieldsValue(globalConfig);
  };

  return (
    <div className={classNames(cssModule.container, className)}>
      <Form
        form={form}
        requiredMark={false}
        onFinish={onFinish}
        onReset={onReset}
      >
        <Form.Item wrapperCol={{ span: 12 }} label="">
          <CodeEditor value={mapInfo} onChange={onMapSettingChange} />
        </Form.Item>
        <Space>
          <Button htmlType="reset">
            <FormattedMessage
              defaultMessage="重置"
              id="GlobalSetting_index_4b9c3271"
            />
          </Button>
          <Button type="primary" htmlType="submit">
            <FormattedMessage
              defaultMessage="确认"
              id="GlobalSetting_index_e83a256e"
            />
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default GlobalSetting;
