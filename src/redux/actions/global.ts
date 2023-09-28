import { createAsyncAction } from 'typesafe-actions';
import { IGetGlobalConfigResponse } from '@/api/types';

/**
 * GLOBAL模块的命令空间
 */
export const NAMESPACE = 'GLOBAL' as const;

/**
 * 获取实时日期时间
 */
export const getRealDateTimeAction = createAsyncAction(
  `${NAMESPACE}/GET_REAL_DATE_TIME_REQUEST`,
  `${NAMESPACE}/GET_REAL_DATE_TIME_SUCCESS`,
  `${NAMESPACE}/GET_REAL_DATE_TIME_FAILURE`
)<void, Date, void>();

/**
 * 获取配置数据
 */
export const getGlobalConfigAction = createAsyncAction(
  `${NAMESPACE}/GET_GLOBAL_CONFIG_REQUEST`,
  `${NAMESPACE}/GET_GLOBAL_CONFIG_SUCCESS`,
  `${NAMESPACE}/GET_GLOBAL_CONFIG_FAILURE`
)<void, IGetGlobalConfigResponse['results'], void>();
