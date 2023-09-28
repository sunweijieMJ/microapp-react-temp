import { createSelector } from 'reselect';
import { NAMESPACE } from '../actions/system';
import { ISystemState } from '../reducers/system';

export const rootSelector = (state: { [NAMESPACE]: ISystemState }) =>
  state[NAMESPACE];

/**
 * 多语言
 */
export const localeSymbolSelector = createSelector(rootSelector, (state) => {
  return state.localeSymbol;
});

/**
 * 主题样式
 */
export const themeSymbolSelector = createSelector(rootSelector, (state) => {
  return state.themeSymbol;
});

/**
 * 高级模式
 */
export const advanceModeSelector = createSelector(rootSelector, (state) => {
  return state.advanceMode;
});
