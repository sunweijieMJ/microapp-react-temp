import { App, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import classnames from 'classnames';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import cssModule from './index.module.scss';
import AvatarImg from '@/assets/image/base/Avatar.png';
import { triggerLogoutAction } from '@/redux/actions/user';

const MESSAGE = defineMessages({
  logout: {
    id: 'HeaderAvatar_index_44efd179',
    defaultMessage: '退出登录',
  },
  logout_confirm: {
    id: 'HeaderAvatar_index_d03b4a74',
    defaultMessage: '确认退出登录吗',
  },
});

interface IProps {
  className?: string;
}

const HeaderAvatar: React.FC<IProps> = (props) => {
  const intl = useIntl();
  const { modal } = App.useApp();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { className } = props;

  const logoutItems: MenuProps['items'] = [
    {
      key: 'logout',
      label: intl.formatMessage(MESSAGE.logout),
    },
  ];
  const handleAvatarClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'logout') {
      modal.confirm({
        centered: true,
        title: intl.formatMessage(MESSAGE.logout_confirm),
        onOk() {
          dispatch(triggerLogoutAction.request({ navigate }));
        },
      });
    }
  };

  return (
    <Dropdown
      menu={{ items: logoutItems, onClick: handleAvatarClick }}
      trigger={['click']}
    >
      <img
        className={classnames(className, cssModule.LayoutHeaderLogoutImg)}
        src={AvatarImg}
        alt=""
      ></img>
    </Dropdown>
  );
};

export default HeaderAvatar;
