import {
  legacyLogicalPropertiesTransformer,
  StyleProvider,
} from '@ant-design/cssinjs';
import { App, ConfigProvider } from 'antd';
import { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { token } from './AntdToken';
import Router from './Router';
import Loading from '@/components/Loading';
import dayjs from '@/plugins/dayjs';
import { Locale } from '@/plugins/locale';
import configureStore from '@/redux';
import { getGlobalConfigAction } from '@/redux/actions/global';
import {
  localeSymbolSelector,
  themeSymbolSelector,
} from '@/redux/selector/system';
import { ANTD_THEME, CookieLocale } from '@/utils/contant/global';
import storage from '@/utils/storage';
import { flattenObj, os } from '@/utils/tools/global';

import './index.scss';

const { store, persistor } = configureStore();

const root = ReactDOM.createRoot(
  document.querySelector('#root') as HTMLElement
);

// 高版本Chrome
const isHighChrome = os().isHighChrome;

const AppContainer = () => {
  const dispatch = useDispatch();

  const localeSymbol = useSelector(localeSymbolSelector);
  const themeSymbol = useSelector(themeSymbolSelector);

  // 网站语言包
  const intlMessages = useMemo(() => {
    return flattenObj(Locale.messages[localeSymbol].txwl);
  }, [localeSymbol]);

  // 获取全局配置
  useEffect(() => {
    dispatch(getGlobalConfigAction.request());
  }, [dispatch]);

  useEffect(() => {
    // 设置网站语言
    document.documentElement.setAttribute('lang', CookieLocale[localeSymbol]);
    // 设置cookie语言
    storage('cookie').set('currentLanguage', CookieLocale[localeSymbol]);
    // 设置日期国际化
    dayjs.locale(localeSymbol);
  }, [localeSymbol]);

  useEffect(() => {
    // 设置网站主题
    document.documentElement.setAttribute('theme', themeSymbol);
  }, [themeSymbol]);

  return (
    <ConfigProvider
      locale={Locale.messages[localeSymbol].antd}
      theme={{
        algorithm: ANTD_THEME[themeSymbol],
        ...token,
      }}
    >
      <IntlProvider locale={localeSymbol} messages={intlMessages}>
        <App>
          {isHighChrome ? (
            <Router />
          ) : (
            <StyleProvider
              hashPriority="high"
              transformers={[legacyLogicalPropertiesTransformer]}
            >
              <Router />
            </StyleProvider>
          )}
        </App>
      </IntlProvider>
    </ConfigProvider>
  );
};

root.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <AppContainer />
    </PersistGate>
  </Provider>
);
