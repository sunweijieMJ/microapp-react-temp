import { SettingOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import cssModule from './index.module.scss';
import { advanceModeSelector } from '@/redux/selector/system';

interface IProps {
  className?: string;
}

const HeaderSetting: React.FC<IProps> = (props) => {
  const { className } = props;
  const navigate = useNavigate();
  const advanceMode = useSelector(advanceModeSelector);

  const handleSettingClick = () => {
    navigate(`/Setting`);
  };

  if (!advanceMode) return;

  return (
    <SettingOutlined
      className={classnames(className, cssModule.LayoutHeaderSetting)}
      onClick={handleSettingClick}
    />
  );
};

export default HeaderSetting;
