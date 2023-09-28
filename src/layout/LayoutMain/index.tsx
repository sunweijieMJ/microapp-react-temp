import { Watermark } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import LayoutHeader from '../LayoutHeader';
import cssModule from './index.module.scss';
import { getRealDateTimeAction } from '@/redux/actions/global';
import { getUserInfoAction } from '@/redux/actions/user';
import {
  globalConfigSelector,
  headerNavListSelector,
} from '@/redux/selector/global';
import { userInfoSelector } from '@/redux/selector/user';
import { getTxwlFreeLoginUrl } from '@/utils/tools/global';

const PREFIX = 'Layout';
interface IProps {
  layout?: Partial<{
    header: boolean;
  }>;
}

const Layout: React.FC<IProps> = (props) => {
  const { layout } = props;
  const dispatch = useDispatch();
  const location = useLocation();
  const userInfo = useSelector(userInfoSelector);
  const globalConfig = useSelector(globalConfigSelector);
  const headerNavList = useSelector(headerNavListSelector);

  useEffect(() => {
    dispatch(getRealDateTimeAction.request());
    dispatch(getUserInfoAction.request());
  }, [dispatch]);

  const watermarkText = useMemo(() => {
    return globalConfig?.watermark?.text ?? userInfo?.name;
  }, [globalConfig, userInfo]);

  // 绘制主区域，判断是否内嵌iframe
  const renderLayoutMain = () => {
    const currentNav = headerNavList.find((nav) =>
      location.pathname.includes(nav.key)
    );

    const outsideUrl = currentNav?.outsideUrl;
    if (currentNav?.isOutside && outsideUrl) {
      const url = new URL(outsideUrl);
      const freeLoginUrl = getTxwlFreeLoginUrl(url.origin, url.pathname);

      return (
        <iframe
          className={cssModule.LayoutIframe}
          src={freeLoginUrl}
          title={currentNav.key}
        ></iframe>
      );
    }
    return <Outlet></Outlet>;
  };

  return (
    <Watermark content={watermarkText}>
      <div className={classNames(PREFIX, cssModule.Layout)}>
        {layout?.header && (
          <LayoutHeader className={cssModule.LayoutHeader}></LayoutHeader>
        )}
        <div className={cssModule.LayoutMain}>{renderLayoutMain()}</div>
      </div>
    </Watermark>
  );
};

Layout.defaultProps = {
  layout: {
    header: true,
  },
};

export default Layout;
