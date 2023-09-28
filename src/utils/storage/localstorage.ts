import { SheetName } from '@/interface';

/**
 * 表格表头key集合
 */
const sheetTitleKeys = (Object.keys(SheetName) as (keyof typeof SheetName)[])
  .filter((key) => isNaN(Number(key)))
  .map((key) => `${key}-sheetKeyMaps` as const);

/**
 * 表格数据key集合
 */
const sheetDataKeys = (Object.keys(SheetName) as (keyof typeof SheetName)[])
  .filter((key) => isNaN(Number(key)))
  .map((key) => `${key}-sheetData` as const);

/**
 * 显示声明localStorage的键
 */
export const LocaleStorageKeys = [
  'session_id', // 登录态
  ...sheetTitleKeys,
  ...sheetDataKeys,
] as const;
type LocaleStorageKeysType = (typeof LocaleStorageKeys)[number];

export type ExpireObj = {
  value: string;
  time: string | number | Date;
};

/**
 * @description LocalStorage的封装
 */
class LocalStorageAPI {
  /**
   * @description 设置localStorage
   * @param key 键
   * @param value 值
   */
  static set(key: LocaleStorageKeysType, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch (e: any) {
      if (e.name === 'QuotaExceededError') {
        throw new Error('Out of Memory Limit localStorage');
      } else {
        throw new Error(e.name);
      }
    }
  }

  /**
   * @description 获取localStorage
   * @param key 键
   */
  static get(key: LocaleStorageKeysType) {
    return localStorage.getItem(key) ?? '';
  }

  /**
   * @description 移除localStorage
   * @param key 键
   */
  static remove(key: LocaleStorageKeysType) {
    localStorage.removeItem(key);
  }

  /**
   * @description 设置localStorage(含过期时间)
   * @param key 键
   * @param value 值
   * @param expire 过期时间
   */
  static setExpire(
    key: LocaleStorageKeysType,
    value: string,
    expire: ExpireObj['time']
  ) {
    let expireTime = '';
    if (expire) {
      expireTime = new Date(expire).toString();
    }

    return LocalStorageAPI.set(
      key,
      JSON.stringify({ value, time: expireTime })
    );
  }

  /**
   * @description 获取localStorage(含过期时间)
   * @param key 键
   */
  static getExpire(key: LocaleStorageKeysType) {
    try {
      const dataObj: ExpireObj = JSON.parse(LocalStorageAPI.get(key));
      if (new Date(dataObj.time).getTime() - new Date().getTime() > 0) {
        return dataObj.value;
      }
    } catch (error) {
      return '';
    }
    return '';
  }
}

export default LocalStorageAPI;
