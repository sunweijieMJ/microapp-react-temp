import urlJoin from 'url-join';
import storage from '@/utils/storage';

/**
 * @description 判断浏览器及终端
 * @param [u=window.navigator.userAgent] userAgent
 */
const os = (u = window?.navigator.userAgent) => {
  return {
    isHighChrome:
      /Chrome\/(\d+)/.test(navigator.userAgent) &&
      parseInt(RegExp.$1, 10) >= 89,
    isMobile: !!u.match(/Mobile/i),
    isWechat: !!u.match(/MicroMessenger/i),
    isQQ: !!u.match(/QQ/i) && !u.match(/MQQBrowser/i),
    isIos: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    isAndroid: !!u.match(/(Android);?[\s/]+([\d.]+)?/),
    isiPhone: !!u.match(/(iPhone\sOS)\s([\d_]+)/),
    isSafari: !!u.match(/Safari/),
    isFirefox: !!u.match(/Firefox/),
    isOpera: !!u.match(/Opera/),
    isChrome:
      u.match(/Chrome/i) !== null &&
      u.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i) === null,
    isPad: !!u.match(/(pad|pod|iPod|iPad)/i),
    isDeskTop: ((): boolean => {
      const AgentList: string[] = [
        'Android',
        'iPhone',
        'SymbianOS',
        'Windows Phone',
        'iPad',
        'iPod',
      ];
      return !AgentList.some((item) => u.includes(item));
    })(),
  };
};

/**
 * @description 对象扁平化
 * @param obj 对象
 */
const flattenObj = (obj: Record<string, any>) => {
  const result: Record<string, any> = {};

  function recurse(src: Record<string, any>, prop: string) {
    const toString = Object.prototype.toString;
    if (toString.call(src) === '[object Object]') {
      let isEmpty = true;
      for (const key in src) {
        if (Object.prototype.hasOwnProperty.call(src, key)) {
          isEmpty = false;
          recurse(src[key], prop ? `${prop}.${key}` : key);
        }
      }

      if (isEmpty && prop) {
        result[prop] = {};
      }
    } else if (toString.call(src) === '[object Array]') {
      const len = src.length;
      if (len > 0) {
        src.forEach((item: Record<string, any>, index: number) => {
          recurse(item, prop ? `${prop}.[${index}]` : `${index}`);
        });
      } else {
        result[prop] = [];
      }
    } else {
      result[prop] = src;
    }
  }
  recurse(obj, '');

  return result;
};

/**
 * 切割数组
 * @param data 原数据
 * @param cb 处理函数
 * @param size 单个批次数量
 */
function splitArray<T>(data: T[], cb: (value: T[]) => T[], size = 10000) {
  const newData: T[] = [];

  // 将数据拆分成多个批次
  const batches = [];
  for (let i = 0; i < data.length; i += size) {
    const batch = data.slice(i, i + size);
    batches.push(batch);
  }

  // 处理每个批次的数据
  batches.forEach(function (batch) {
    newData.push(...cb(batch));
  });

  return newData;
}

/**
 * 数组去重返回新数组
 * @param arr
 * @param uniId
 */
function uniqueArray<T extends Record<string, any>>(arr: T[], uniId: string) {
  const res = new Map();
  return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1));
}

/**
 * 判断json是否合法
 * @param str
 */
const isJsonString = (str: string) => {
  if (typeof str === 'string') {
    try {
      if (typeof JSON.parse(str) === 'object') {
        return true;
      }
    } catch (error) {
      return false;
    }
  }
  return false;
};

/**
 * @description 解析url为query对象
 * @param href url地址
 */
const getSearchParams = (href: string) => {
  if (!href) return {};
  const response: Record<string, string> = {};
  href = decodeURIComponent(href);
  const strs: string = href.split('?')[1];
  if (!strs) return response;
  const strArr = strs.split('&');
  for (let i = 0, LEN = strArr.length; i < LEN; i++) {
    response[strArr[i].split('=')[0]] = strArr[i].split('=')[1];
  }
  return response;
};

/**
 * @description query对象转换为url
 * @param query query对象
 */
const setSearchParams = (query: Record<string, string | number | boolean>) => {
  let url = '';
  Object.keys(query).forEach((k) => {
    const value = query[k] !== undefined ? query[k] : '';
    url += `&${k}=${encodeURIComponent(value)}`;
  });
  return url ? url.substring(1) : '';
};

/**
 * @description 获取txwl免密跳转url
 * @param host
 * @param url
 * @param target
 */
const getTxwlFreeLoginUrl = (host: string, url: string) => {
  const session_id = storage('cookie').get('session_id');
  const target_route = encodeURIComponent(url);
  const targetUrl = `${urlJoin(
    host,
    url
  )}?session_id=${session_id}&target_route=${target_route}`;
  return targetUrl;
};

/**
 * @description 判断数组是否从Map转换
 * @param arr
 */
const isArrayFromMap = <T extends any[]>(arr: T) => {
  if (Array.isArray(arr)) {
    const keys = new Set();
    let isMap = true;

    for (const item of arr) {
      if (Array.isArray(item) && item.length === 2) {
        const [key] = item;
        if (keys.has(key)) {
          isMap = false;
          break;
        }
        keys.add(key);
      } else {
        isMap = false;
        break;
      }
    }

    return isMap;
  }

  return false;
};

/**
 * @description 判断数组是否从Set转换
 * @param arr
 */
const isArrayFromSet = <T extends any[]>(arr: T) => {
  if (Array.isArray(arr)) {
    const set = new Set(arr);
    return set.size === arr.length;
  }
  return false;
};

export {
  os,
  flattenObj,
  splitArray,
  uniqueArray,
  isJsonString,
  getSearchParams,
  setSearchParams,
  getTxwlFreeLoginUrl,
  isArrayFromMap,
  isArrayFromSet,
};
