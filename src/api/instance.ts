import { message } from 'antd';
import axios from 'axios';
import { createIntl, createIntlCache } from 'react-intl';
import Locale from '@/plugins/locale';
import storage from '@/utils/storage';

const BASE_URL = window.location.origin;

const cache = createIntlCache();
const intl = createIntl(Locale, cache);

const TIMEOUT = 10 * 60 * 1000;

// axios 实例
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

// 添加请求拦截器
instance.interceptors.request.use(
  (request) => {
    // 默认headers
    const newHeaders: any = {
      session_id: storage('localStorage').get('session_id'),
    };

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
    const code = response?.data?.rtn;
    switch (code) {
      case '20312':
        // session失效
        storage('localStorage').remove('session_id');
        window.location.href = `/Login`;
        break;
      default:
        break;
    }

    return response;
  },
  async (error) => {
    const { response } = error;
    const redirectUrl = encodeURIComponent(window.location.href);
    // 根据返回的code值来做不同的处理(和后端约定)
    switch (response?.status) {
      case 401:
        // token失效
        message.error(
          intl.formatMessage({
            id: 'api_instance_395c1c03',
            defaultMessage: '请求超时了',
          })
        );
        window.location.href = `/Login?redirect=${redirectUrl}`;
        break;
      case 403:
        // 没有权限
        break;
      case 404:
        // 地址错误
        break;
      case 500:
        // 服务端错误
        message.error(
          intl.formatMessage({
            id: 'api_instance_41778e2e',
            defaultMessage: '请求失败了',
          })
        );
        break;
      case 503:
        // 服务端错误
        break;
      default:
        break;
    }

    /**
     * 超时重新请求
     */
    const { config } = error;

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
