import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { useLocation, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import MohoSetting from './components/MohoSetting';
import cssModule from './index.module.scss';
import { KEYS } from './interface';

const MESSAGES = defineMessages({
  Moho: {
    id: 'Setting_index_8e8aaafe',
    defaultMessage: '全局配置',
  },
});

const settingNavList: MenuProps['items'] = [
  {
    label: <FormattedMessage {...MESSAGES.Moho} />,
    key: KEYS.MOHO,
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
      case KEYS.MOHO:
        return <MohoSetting />;
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
