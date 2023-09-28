import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { useLocation, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import GlobalSetting from './components/GlobalSetting';
import SheetSetting from './components/SheetSetting';
import cssModule from './index.module.scss';
import { KEYS } from './interface';

const MESSAGES = defineMessages({
  globalTitle: {
    id: 'Setting_index_8e8aaafe',
    defaultMessage: '全局配置',
  },
  sheetTitle: {
    id: 'Setting_index_e6c48956',
    defaultMessage: '表格配置',
  },
});

const settingNavList: MenuProps['items'] = [
  {
    label: <FormattedMessage {...MESSAGES.globalTitle} />,
    key: KEYS.GLOBAL,
  },
  {
    label: <FormattedMessage {...MESSAGES.sheetTitle} />,
    key: KEYS.SHEET,
  },
];

interface IProps {
  className?: string;
}

const Setting: React.FC<IProps> = (props) => {
  const { className } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [selectedKeys, setSelectedKeys] = useState<MenuProps['selectedKeys']>();

  useEffect(() => {
    const key = searchParams.get('key');
    const activeNav = settingNavList.find((nav) => key === nav?.key);
    const selectedKey = activeNav?.key ?? settingNavList[0]?.key;
    if (selectedKey) {
      setSelectedKeys([selectedKey.toString()]);
    }
  }, [searchParams]);

  const handleNavSelect: MenuProps['onSelect'] = (nav) => {
    navigate({
      pathname: location.pathname,
      search: `?key=${nav.key}`,
    });
    setSelectedKeys(nav.selectedKeys);
  };

  const renderMainArea = () => {
    const key = selectedKeys?.join('');
    switch (key) {
      case KEYS.GLOBAL:
        return <GlobalSetting />;
      case KEYS.SHEET:
        return <SheetSetting />;
      default:
        return <>暂无内容</>;
    }
  };

  return (
    <div className={classNames(cssModule.container, className)}>
      <div className={classNames(cssModule.LeftNav)}>
        <Menu
          className={classNames(cssModule.LeftNavMenu)}
          mode="inline"
          selectedKeys={selectedKeys}
          items={settingNavList}
          onSelect={handleNavSelect}
        />
      </div>
      <div className={classNames(cssModule.RightMain)}>{renderMainArea()}</div>
    </div>
  );
};

export default Setting;
