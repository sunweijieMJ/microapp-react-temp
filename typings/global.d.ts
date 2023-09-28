import type { MicroApp } from 'qiankun';

type CustomMicroApp = MicroApp & {
  name: string;
};

declare global {
  interface Window {
    activeMicroApp: CustomMicroApp | null;
    activatedMicroApp: CustomMicroApp[];
    env: {
      /**
       * 环境标识
       */
      NODE_ENV: 'development' | 'production';
      /**
       * 后端接口地址
       */
      REACT_APP_BaseURL: string;
      /**
       * 前端页面地址
       */
      REACT_APP_WebURL: string;
    };
  }
}
