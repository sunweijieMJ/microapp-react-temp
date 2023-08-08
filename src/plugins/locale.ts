import antdEnUS from 'antd/locale/en_US';
import antdZhCN from 'antd/locale/zh_CN';
import type { LocaleKey } from '@/interface';
import enUS from '@/locale/en-US.json';
import zhCN from '@/locale/zh-CN.json';

export type ILocale = {
  locale: LocaleKey;
  messages: Record<LocaleKey, any>;
};

const curLang = 'zh-CN';

const Locale: ILocale = {
  locale: curLang,
  messages: {
    'zh-CN': {
      antd: antdZhCN,
      ...zhCN,
    },
    'en-US': {
      antd: antdEnUS,
      ...enUS,
    },
  },
};

export default Locale;
