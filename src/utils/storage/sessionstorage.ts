/**
 * 显示声明sessionStorage的键
 */
export const SessionStorageKeys = [
  'session_id', // 登录态
] as const;
type SessionStorageKeysType = (typeof SessionStorageKeys)[number];

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
}

export default SessionStorageAPI;
