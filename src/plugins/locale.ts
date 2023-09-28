import antdEnUS from 'antd/locale/en_US';
import antdZhCN from 'antd/locale/zh_CN';
import { createIntl, createIntlCache } from 'react-intl';
import type { LocaleKey } from '@/interface';
import enUS from '@/locale/en-US.json';
import zhCN from '@/locale/zh-CN.json';
import { DEFAULT_LOCALE } from '@/utils/contant/global';

export type ILocale = {
  locale: LocaleKey;
  messages: Record<LocaleKey, any>;
};

/**
 * 语言包对象
 */
export const Locale: ILocale = {
  locale: DEFAULT_LOCALE,
  messages: {
    'zh-CN': {
      antd: antdZhCN,
      txwl: zhCN,
    },
    'en-US': {
      antd: antdEnUS,
      txwl: enUS,
    },
  },
};

const cache = createIntlCache();

/**
 * intl实例，函数中使用
 */
export const intl = createIntl(
  {
    ...Locale,
    defaultLocale: DEFAULT_LOCALE,
  },
  cache
);
