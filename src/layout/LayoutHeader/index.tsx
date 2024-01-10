import classnames from 'classnames';
import React from 'react';
import HeaderAvatar from './components/HeaderAvatar';
import HeaderDateTime from './components/HeaderDateTime';
import HeaderLogo from './components/HeaderLogo';
import HeaderNav from './components/HeaderNav';
import HeaderSetting from './components/HeaderSetting';
import LocaleSwitch from './components/LocaleSwitch';
import ThemeSwitch from './components/ThemeSwitch';
import cssModule from './index.module.scss';

interface IProps {
  className?: string;
  showHeaderLogo?: boolean;
  showHeaderNav?: boolean;
  showHeaderDateTime?: boolean;
  showThemeSwitch?: boolean;
  showLocaleSwitch?: boolean;
  showHeaderSetting?: boolean;
  showHeaderAvatar?: boolean;
}

const LayoutHeader: React.FC<IProps> = (props) => {
  const {
    className,
    showHeaderLogo,
    showHeaderNav,
    showHeaderDateTime,
    showThemeSwitch,
    showLocaleSwitch,
    showHeaderSetting,
    showHeaderAvatar,
  } = props;

  return (
    <header className={classnames(className, cssModule.LayoutHeader)}>
      <div className={cssModule.LayoutHeaderLeft}>
        {showHeaderLogo && <HeaderLogo />}
      </div>
      {showHeaderNav && <HeaderNav />}
      <div className={cssModule.LayoutHeaderRight}>
        {showHeaderDateTime && (
          <HeaderDateTime className={cssModule.LayoutHeaderRightItem} />
        )}
        {showThemeSwitch && (
          <ThemeSwitch className={cssModule.LayoutHeaderRightItem} />
        )}
        {showLocaleSwitch && (
          <LocaleSwitch className={cssModule.LayoutHeaderRightItem} />
        )}
        {showHeaderSetting && (
          <HeaderSetting className={cssModule.LayoutHeaderRightItem} />
        )}
        {showHeaderAvatar && (
          <HeaderAvatar className={cssModule.LayoutHeaderRightItem} />
        )}
      </div>
    </header>
  );
};

LayoutHeader.defaultProps = {
  className: '',
  showHeaderLogo: true,
  showHeaderNav: true,
  showHeaderDateTime: false,
  showThemeSwitch: true,
  showLocaleSwitch: true,
  showHeaderSetting: true,
  showHeaderAvatar: true,
};

export default LayoutHeader;
