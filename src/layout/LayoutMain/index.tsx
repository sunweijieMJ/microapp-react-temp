import { Watermark } from 'antd';
import classnames from 'classnames';
import _ from 'lodash';
import { loadMicroApp } from 'qiankun';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LayoutHeader from '../LayoutHeader';
import cssModule from './index.module.scss';
import { getRealDateTimeAction } from '@/redux/actions/global';
import { getUserInfoAction } from '@/redux/actions/user';
import { globalConfigSelector } from '@/redux/selector/global';
import { userInfoSelector } from '@/redux/selector/user';
import microAppList, { menuList } from '@/utils/contant/microApps';

const PREFIX = 'Layout';
interface IProps {
  layout?: Partial<{
    header: boolean;
  }>;
}

const Layout: React.FC<IProps> = (props) => {
  const { layout } = props;
  const dispatch = useDispatch();
  const userInfo = useSelector(userInfoSelector);
  const globalConfig = useSelector(globalConfigSelector);

  // 子应用上限
  const microAppLimit = 10;

  // 获取当前激活的子应用
  const getActiveMicroApp = (
    defaultPath = `/${window.location.pathname.split('/')[1]}`
  ) => {
    const activeMicroApp = _.find(microAppList, (item) =>
      Array.isArray(item.activeRule)
        ? item.activeRule.includes(defaultPath)
        : item.activeRule === defaultPath
    );

    return activeMicroApp;
  };

  // 当前激活应用名称
  const [activeMicroAppName, setActiveMicroAppName] = useState('');

  const watermarkText = useMemo(() => {
    return globalConfig?.watermark?.text ?? userInfo?.name;
  }, [globalConfig, userInfo]);

  // 手动加载子应用
  const manualLoadMicroApps = useCallback(
    (defaultPath?: string, singular = false) => {
      const microApp = getActiveMicroApp(defaultPath);
      if (window.activeMicroApp?.name === microApp?.name || !microApp) return;

      // 单实例模式
      if (singular) {
        // 卸载前一个子应用
        if (window.activeMicroApp?.getStatus() === 'MOUNTED') {
          window.activeMicroApp.unmount();
          window.activeMicroApp = null;
          window.activatedMicroApp = [];
          setActiveMicroAppName('');
        }

        // 加载新的子应用
        const newMicroApp = {
          name: microApp.name,
          ...loadMicroApp(microApp, {
            singular: true,
            sandbox: { strictStyleIsolation: true },
          }),
        };
        newMicroApp.mountPromise.then(() => {
          setActiveMicroAppName(microApp.name);
        });

        window.activeMicroApp = newMicroApp;
        window.activatedMicroApp = [window.activeMicroApp];
      } else {
        const activeMicroApp = _.find(
          window.activatedMicroApp,
          (item) => item.name === microApp.name
        );

        // 判断当前子应用是否加载过
        if (activeMicroApp) {
          window.activeMicroApp = activeMicroApp;
          activeMicroApp.mountPromise.then(() => {
            setActiveMicroAppName(microApp.name);
          });
        } else {
          const newMicroApp = {
            name: microApp.name,
            ...loadMicroApp(microApp, {
              singular: true,
              sandbox: { strictStyleIsolation: true },
            }),
          };
          newMicroApp.mountPromise.then(() => {
            setActiveMicroAppName(microApp.name);
          });

          window.activeMicroApp = newMicroApp;
          window.activatedMicroApp.push(window.activeMicroApp);
          // 超出数量限制，卸载第一个
          if (window.activatedMicroApp.length > microAppLimit) {
            window.activatedMicroApp.shift()?.unmount();
          }
        }
      }
    },
    []
  );

  const loadApp = useCallback(() => {
    // 设置默认子应用
    let defaultPath = '';
    const pathname = window.location.pathname;

    if (pathname.split('/')[1]) {
      defaultPath = `/${pathname.split('/')[1]}`;
    }
    if (!defaultPath && menuList.length) defaultPath = menuList[0].routePath;

    // 重置子应用数组
    if (!window.activatedMicroApp?.length) window.activatedMicroApp = [];

    manualLoadMicroApps(defaultPath);
  }, [manualLoadMicroApps]);

  useEffect(() => {
    dispatch(getRealDateTimeAction.request());
    dispatch(getUserInfoAction.request());
    loadApp();
  }, [dispatch, loadApp]);

  return (
    <Watermark content={watermarkText}>
      <div className={classnames(PREFIX, cssModule.Layout)}>
        {layout?.header && (
          <LayoutHeader className={cssModule.LayoutHeader}></LayoutHeader>
        )}
        {microAppList.map((item, index) => {
          return (
            <div
              id={item.name}
              key={index}
              className={classnames(cssModule.LayoutMain, {
                'active-app': activeMicroAppName === item.name,
              })}
            ></div>
          );
        })}
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
