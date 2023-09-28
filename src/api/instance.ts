import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ERROR_CODE_SESSION_INVALID } from '@/utils/contant/errorCode';
import { removeLoginToken } from '@/utils/tools/user';

const BASE_URL = window.location.origin;
const TIMEOUT = 10 * 60 * 1000;

/**
 * axios拦截器实例
 */
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'frontend-request-id': uuidv4(),
  },
});

// 添加请求拦截器
instance.interceptors.request.use(
  (request) => {
    // 默认headers
    const newHeaders: any = {};

    // 设置新的参数
    request.headers = { ...request.headers, ...newHeaders };

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    const errorCode = response?.data?.rtn;
    const redirectUrl = encodeURIComponent(window.location.href);

    switch (errorCode) {
      case ERROR_CODE_SESSION_INVALID:
        removeLoginToken();
        window.location.href = `/Login?redirect=${redirectUrl}`;
        break;
      default:
        break;
    }

    return response;
  },
  async (error) => {
    const response = error.response;
    // 根据返回的code值来做不同的处理(和后端约定)
    switch (response?.status) {
      case 401:
        // token失效
        break;
      case 403:
        // 没有权限
        break;
      case 404:
        // 地址错误
        break;
      case 500:
        // 服务端错误
        break;
      default:
        break;
    }

    /**
     * 超时重新请求
     */
    const config = error.config;

    // 再次请求次数,请求间隔时间
    const RETRY_COUNT = config?.headers?.retryCount ?? 0;
    const RETRY_DELAY = config?.headers?.retryDelay ?? 1000;

    if (config && RETRY_COUNT) {
      // 设置用于跟踪重试计数的变量
      config.retryCount = config.retryCount || 0;
      // 检查是否已经把重试的总数用完
      if (config.retryCount >= RETRY_COUNT) {
        return Promise.reject(response || { message: error.message });
      }
      // 增加重试计数
      config.retryCount++;
      // 创造新的Promise来处理指数后退
      const backOff = new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, RETRY_DELAY);
      });
      // instance重试请求的Promise
      return backOff.then(() => instance(config));
    }

    // eslint-disable-next-line
    return Promise.reject(response || { message: error.message });
  }
);

export default instance;
