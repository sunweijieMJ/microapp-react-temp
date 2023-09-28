import { GlobalOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import cssModule from './index.module.scss';
import { updateLocaleAction } from '@/redux/actions/system';
import {
  CookieLocale,
  DEFAULT_LOCALE,
  LOCALE_TYPE,
} from '@/utils/contant/global';
import storage from '@/utils/storage';

const MESSAGE = defineMessages({
  chinese_text: {
    id: 'LocaleSwitch_index_a7bac223',
    defaultMessage: '中文',
  },
  english_text: {
    id: 'LocaleSwitch_index_78463a38',
    defaultMessage: 'English',
  },
});

interface IProps {
  className?: string;
}

const LocaleSwitch: React.FC<IProps> = (props) => {
  const intl = useIntl();
  const { className } = props;
  const dispatch = useDispatch();

  const localeItems: MenuProps['items'] = [
    {
      key: 'chinese',
      label: intl.formatMessage(MESSAGE.chinese_text),
    },
    {
      key: 'english',
      label: intl.formatMessage(MESSAGE.english_text),
    },
  ];
  const handleLocaleClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'chinese') {
      dispatch(updateLocaleAction(LOCALE_TYPE.ZH_CN));
    } else if (e.key === 'english') {
      dispatch(updateLocaleAction(LOCALE_TYPE.EN_US));
    }
    storage('cookie').set('currentLanguage', CookieLocale[DEFAULT_LOCALE]);
  };

  return (
    <Dropdown
      className={className}
      menu={{ items: localeItems, onClick: handleLocaleClick }}
      trigger={['click']}
    >
      <GlobalOutlined className={cssModule.LayoutHeaderLocale} />
    </Dropdown>
  );
};

export default LocaleSwitch;
