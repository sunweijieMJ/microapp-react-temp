import { createSelector } from 'reselect';
import { IUserState } from '../reducers/user';

export const userSelector = (state: { user: IUserState }) => state.user;

/**
 * 登录信息
 */
export const loginInfoSelector = createSelector(
  userSelector,
  (state) => state.loginInfo
);
