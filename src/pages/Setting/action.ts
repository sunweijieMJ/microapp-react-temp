import { createAsyncAction } from 'typesafe-actions';
import { IPutGlobalConfigRequest } from '@/api/types';

export const NAMESPACE = 'SETTING' as const;

/**
 * 修改全局配置
 */
export const putGlobalConfigAction = createAsyncAction(
  `${NAMESPACE}/PUT_GLOBAL_CONFIG_REQUEST`,
  `${NAMESPACE}/PUT_GLOBAL_CONFIG_SUCCESS`,
  `${NAMESPACE}/PUT_GLOBAL_CONFIG_FAILURE`
)<IPutGlobalConfigRequest, void, void>();
