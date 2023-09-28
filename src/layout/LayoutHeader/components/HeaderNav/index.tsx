import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import cssModule from './index.module.scss';
import { IHeaderNavList } from '@/interface';
import { headerNavListSelector } from '@/redux/selector/global';

interface IProps {
  className?: string;
}

const HeaderNav: React.FC<IProps> = (props) => {
  const { className } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const headerNavList = useSelector(headerNavListSelector);
  const [currentNav, setCurrentNav] = useState<string>();

  useEffect(() => {
    const activeNav = headerNavList.find((nav) =>
      location.pathname.includes(nav.key)
    );
    setCurrentNav(activeNav?.key);
  }, [location, headerNavList]);

  // 导航跳转
  const handleNavClick = (item: IHeaderNavList) => {
    if (item.isOutside && item.outsideUrl && item.outsideTarget) {
      window.open(item.outsideUrl, item.outsideTarget);
    } else {
      setCurrentNav(item.key);
      navigate(`/${item.key}`);
    }
  };

  return (
    <ul className={classnames(className, cssModule.LayoutHeaderNavWrap)}>
      {headerNavList.map((nav) => {
        return (
          !nav.isHidden && (
            <li
              className={classnames(cssModule.LayoutHeaderNav, {
                [cssModule.LayoutHeaderNavActive]: currentNav === nav.key,
              })}
              key={nav.key}
              onClick={() => handleNavClick(nav)}
            >
              <span className={cssModule.LayoutHeaderNavText}>{nav.label}</span>
            </li>
          )
        );
      })}
    </ul>
  );
};

export default HeaderNav;
