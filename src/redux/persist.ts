import localforage from 'localforage';
import _ from 'lodash';
import { createTransform, persistReducer } from 'redux-persist';
import { NAMESPACE as system_NAMESPACE } from './actions/system';
import { NAMESPACE as user_NAMESPACE } from './actions/user';
import rootReducer from './reducers';
import { isArrayFromMap, isArrayFromSet } from '@/utils/tools/global';

const cacheWhitelist = [system_NAMESPACE];
const cacheBlacklist = [user_NAMESPACE];
// 自定义持久化的转换
const SetTransform = createTransform<any, any>(
  (inboundState) => {
    _.forEach(inboundState, (value, key) => {
      // Map/Set结构转为数组
      if (value instanceof Map || value instanceof Set) {
        inboundState = {
          ...inboundState,
          [key]: Array.from(value),
        };
      }
    });

    return inboundState;
  },
  (outboundState) => {
    _.forEach(outboundState, (value, key) => {
      // 数组转为Map
      if (isArrayFromMap(value)) {
        outboundState = {
          ...outboundState,
          [key]: new Map(value),
        };
      }
      // 数组转为Set
      if (isArrayFromSet(value)) {
        outboundState = {
          ...outboundState,
          [key]: new Set(value),
        };
      }
    });

    return outboundState;
  }
);

/**
 * 持久化配置
 */
const persistConfig = {
  key: 'root',
  storage: localforage.createInstance({
    name: 'redux',
    storeName: 'reduxPersist',
  }),
  serialize: false, // 存入indexedDB，不做序列化处理
  deserialize: false, // 读取indexedDB，不做反序列化处理
  transforms: [SetTransform],
  whitelist: cacheWhitelist,
  blacklist: cacheBlacklist,
};

/**
 * 持久化的reducer
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
