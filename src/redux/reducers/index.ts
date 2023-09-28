import { combineReducers } from 'redux';
import { getModules } from '../modules';
import globalReducer from './global';
import systemReducer from './system';
import userReducer from './user';

const subModules = getModules();

export type IModuleStore = (typeof subModules)[number];

type ObjectFromIModule = {
  [K in IModuleStore['namespace']]: Extract<
    IModuleStore,
    { namespace: K }
  >['reducer'];
};

/**
 * 获取页面模块的reducer
 */
export const getAsyncReducer = () => {
  const asyncReducer = subModules.reduce((result, item) => {
    // TODO修复类型
    result[item.namespace] = item.reducer as any;
    return result;
  }, {} as ObjectFromIModule);

  return asyncReducer;
};

const rootReducer = combineReducers({
  ...systemReducer,
  ...globalReducer,
  ...userReducer,
  ...getAsyncReducer(),
});

export default rootReducer;
