import { createAction } from 'typesafe-actions';
import { LOOP_STATUS_ENUM } from '../utils/loop';

export const NAMESPACE = 'LOOP' as const;

/**
 * 触发配置轮询
 */
export const triggerConfigLoopAction = createAction(
  `${NAMESPACE}/TRIGGER_SHORT_LOOP`
)();

/**
 * 更新配置轮询
 */
export const updateConfigLoopAction = createAction(
  `${NAMESPACE}/UPDATE_SHORT_LOOP`
)<{
  status?: LOOP_STATUS_ENUM;
  delay?: number;
}>();
