import { cookieKey } from './keyMap';

type CookieKeysType = (typeof cookieKey)[number];

/**
 * @description Cookie的封装
 */
class CookieAPI {
  /**
   * @description 设置cookie
   * @param key 键
   * @param value 值
   * @param [expire] 过期时间
   * @param [domain] 域名
   * @param [path] 路径
   */
  static set(
    key: CookieKeysType,
    value: string,
    expire: string | number | Date = '',
    domain = '',
    path = '/'
  ) {
    let expireTime = '';
    if (expire) {
      expireTime = new Date(expire).toUTCString();
    }
    document.cookie = `${key}=${value}; expires=${expireTime};domain=${domain};path=${path}`;
  }

  /**
   * @description 获取cookie
   * @param key 键
   */
  static get(key: CookieKeysType) {
    if (document.cookie.length > 0) {
      let cStart = document.cookie.indexOf(`${key}=`);
      if (cStart !== -1) {
        cStart = cStart + key.length + 1;
        let cEnd = document.cookie.indexOf(';', cStart);
        if (cEnd === -1) cEnd = document.cookie.length;
        return document.cookie.substring(cStart, cEnd);
      }
    }
    return '';
  }

  /**
   * @description 移除cookie
   * @param key 键
   */
  static remove(key: CookieKeysType) {
    CookieAPI.set(key, '', new Date(0).toUTCString());
  }

  /**
   * @description 获取cookie所有key值
   */
  static keys() {
    const cookies = document.cookie.split('; ');
    const keyList = [];
    for (let i = 0; i < cookies.length; i++) {
      const cookieKey = cookies[i].split('=')[0];
      keyList.push(cookieKey);
    }
    return keyList;
  }

  /**
   * @description 清空cookie
   */
  static clear() {
    const cookies = document.cookie.split(';');
    const expires = new Date(0).toUTCString();
    const pathBits = window.location.pathname.split('/');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      let path = '';
      for (let j = 0; j < pathBits.length; j++) {
        path += (path.substring(-1) !== '/' ? '/' : '') + pathBits[j];
        document.cookie = `${name}=; expires=${expires}; path=${path}`;
      }
    }
  }
}

export default CookieAPI;
