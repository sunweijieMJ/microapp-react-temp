import { NavigateFunction } from 'react-router';

export enum LocaleList {
  'zh-CN',
  'en-US',
}

export type LocaleKey = keyof typeof LocaleList;

export enum ThemeStyleList {
  'light',
  'dark',
}

export type ThemeStyleKey = keyof typeof ThemeStyleList;

export type INavigateParams = { navigate: NavigateFunction; targetUrl: string };

export type IHeaderNavList = {
  label: string;
  key: string;
  isOutside?: boolean;
  outsideUrl?: string;
  isHidden?: boolean;
  outsideTarget?: string;
};

export interface IGlobalConfig {
  version: string;
  logoText: string;
  logoImg: string;
  account: {
    username: string;
    password: string;
  };
  watermark: {
    text: string;
  };
}
