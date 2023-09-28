import { theme } from 'antd';

/**
 * 不同服务的代理前缀
 */
export const PROXY_URI = {
  MOCK: '/mockService',
} as const;

/**
 * 应用名称
 */
export const APP_NAME = 'txwl-dashboard';

/**
 * 默认语言
 */
export const DEFAULT_LOCALE = 'zh-CN';

/**
 * 默认主题
 */
export const DEFAULT_THEME_STYLE = 'dark';

/**
 * antd主题映射
 */
export const ANTD_THEME = {
  light: theme.defaultAlgorithm,
  dark: theme.darkAlgorithm,
} as const;

/**
 * 语言包选项
 */
export const LOCALE_TYPE = {
  ZH_CN: 'zh-CN',
  EN_US: 'en-US',
} as const;

/**
 * 存储cookie的语言映射枚举
 */
export enum CookieLocale {
  'zh-CN' = 'cn',
  'en-US' = 'en',
}

/**
 * 登录默认路由
 */
export const LOGIN_DEFAULT_ROUTE = '/HomePage';

/**
 * 登出默认路由
 */
export const LOGOUT_DEFAULT_ROUTE = '/Login';

/**
 * 屏幕宽度
 */
export const SCREEN_WIDTH = 1920;

/**
 * 屏幕高度
 */
export const SCREEN_HEIGHT = 1080;

/**
 * 顶部默认导航列表
 */
export const DEFAULT_HEADER_NAV_LIST = [
  {
    label: '主界面',
    key: 'HomePage',
  },
  {
    label: 'RAP2',
    key: 'RAP2',
    isOutside: true,
    outsideUrl: 'http://rap2.taobao.org/',
  },
];
