import { createSelector } from 'reselect';
import { NAMESPACE } from '../actions/user';
import { IUserState } from '../reducers/user';

export const rootSelector = (state: { [NAMESPACE]: IUserState }) =>
  state[NAMESPACE];

/**
 * 登录信息
 */
export const loginInfoSelector = createSelector(rootSelector, (state) => {
  return state.loginInfo;
});

/**
 * 用户信息
 */
export const userInfoSelector = createSelector(rootSelector, (state) => {
  return state.userInfo;
});
