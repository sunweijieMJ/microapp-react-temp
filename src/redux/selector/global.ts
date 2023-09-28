import { createSelector } from 'reselect';
import { NAMESPACE } from '../actions/global';
import { IGlobalState } from '../reducers/global';

export const rootSelector = (state: { [NAMESPACE]: IGlobalState }) =>
  state[NAMESPACE];

/**
 * 实时日期时间
 */
export const realDateTimeSelector = createSelector(rootSelector, (state) => {
  return state.realDateTime;
});

/**
 * 全局配置数据
 */
export const globalConfigSelector = createSelector(rootSelector, (state) => {
  return state.globalConfig;
});

/**
 * 顶部导航列表
 */
export const headerNavListSelector = createSelector(rootSelector, (state) => {
  return state.headerNavList;
});
