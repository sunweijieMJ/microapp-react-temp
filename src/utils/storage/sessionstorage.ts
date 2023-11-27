import { sessionStorageKey } from './keyMap';

type SessionStorageKeysType = (typeof sessionStorageKey)[number];

/**
 * @description SessionStorage的封装
 */
class SessionStorageAPI {
  /**
   * @description 设置sessionStorage
   * @param key 键
   * @param value 值
   */
  static set(key: SessionStorageKeysType, value: string) {
    return sessionStorage.setItem(key, value);
  }

  /**
   * @description 获取sessionStorage
   * @param key 键
   */
  static get(key: SessionStorageKeysType) {
    return sessionStorage.getItem(key) ?? '';
  }

  /**
   * @description 移除sessionStorage
   * @param key 键
   */
  static remove(key: SessionStorageKeysType) {
    return sessionStorage.removeItem(key);
  }

  /**
   * @description 获取sessionStorage所有key值
   */
  static keys() {
    const keyList = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      keyList.push(sessionStorage.key(i));
    }
    return keyList;
  }

  /**
   * @description 清空sessionStorage
   */
  static clear() {
    sessionStorage.clear();
  }
}

export default SessionStorageAPI;
