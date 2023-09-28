import { createAsyncAction } from 'typesafe-actions';
import {
  IGetUserInfoResponse,
  ILoginRequest,
  ILoginResponse,
} from '@/api/types';
import { INavigateParams } from '@/interface';

/**
 * USER模块的命令空间
 */
export const NAMESPACE = 'USER' as const;

/**
 * 登录
 */
export const triggerLoginAction = createAsyncAction(
  `${NAMESPACE}/LOGIN_REQUEST`,
  `${NAMESPACE}/LOGIN_SUCCESS`,
  `${NAMESPACE}/LOGIN_FAILURE`
)<ILoginRequest & Partial<INavigateParams>, ILoginResponse, void>();

/**
 * 登出
 */
export const triggerLogoutAction = createAsyncAction(
  `${NAMESPACE}/LOGOUT_REQUEST`,
  `${NAMESPACE}/LOGOUT_SUCCESS`,
  `${NAMESPACE}/LOGOUT_FAILURE`
)<Partial<INavigateParams>, void, void>();

/**
 * 获取用户信息
 */
export const getUserInfoAction = createAsyncAction(
  `${NAMESPACE}/GET_USER_INFO_REQUEST`,
  `${NAMESPACE}/GET_USER_INFO_SUCCESS`,
  `${NAMESPACE}/GET_USER_INFO_FAILURE`
)<void, IGetUserInfoResponse['results'], void>();
