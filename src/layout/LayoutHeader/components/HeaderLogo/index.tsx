import classnames from 'classnames';
import React, { useMemo } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import cssModule from './index.module.scss';
import LogoImg from '@/assets/image/base/Logo.png';
import { triggerAdvanceModeAction } from '@/redux/actions/system';
import { globalConfigSelector } from '@/redux/selector/global';

const MESSAGE = defineMessages({
  title: {
    id: 'HeaderLogo_index_81ca0e14',
    defaultMessage: '图像围栏',
  },
});

interface IProps {
  className?: string;
}

const HeaderLogo: React.FC<IProps> = (props) => {
  const { className } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const globalConfig = useSelector(globalConfigSelector);

  const headerLogoTitle = useMemo(() => {
    return globalConfig?.logoText;
  }, [globalConfig]);

  const headerLogoImg = useMemo(() => {
    return globalConfig?.logoImg ?? LogoImg;
  }, [globalConfig]);

  const handleLogoClick = () => {
    navigate(`/HomePage`);
    dispatch(triggerAdvanceModeAction.request());
  };

  const renderLogoText = () => {
    return headerLogoTitle ?? <FormattedMessage {...MESSAGE.title} />;
  };

  const renderLogoImg = () => {
    const imgSrc = headerLogoImg;
    return (
      <img className={cssModule.LayoutHeaderLogoImg} src={imgSrc} alt=""></img>
    );
  };

  return (
    <h1
      className={classnames(className, cssModule.LayoutHeaderLeft)}
      onClick={handleLogoClick}
    >
      {renderLogoImg()}
      <span className={cssModule.LayoutHeaderLogoText}>{renderLogoText()}</span>
    </h1>
  );
};

export default HeaderLogo;
