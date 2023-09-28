import { createAction, createAsyncAction } from 'typesafe-actions';
import type { LocaleKey, ThemeStyleKey } from '@/interface';

/**
 * SYSTEM模块的命令空间
 */
export const NAMESPACE = 'SYSTEM' as const;

/**
 * 重置SYSTEM模块
 */
export const resetSystemReducerAction = createAction(
  `${NAMESPACE}/RESET_SYSTEM_REDUCER`
)();

/**
 * 更新语言
 */
export const updateLocaleAction = createAction(
  `${NAMESPACE}/UPDATE_LOCALE`
)<LocaleKey>();

/**
 * 更新主题样式
 */
export const updateThemeStylemAction = createAction(
  `${NAMESPACE}/UPDATE_THEME_STYLE`
)<ThemeStyleKey>();

/**
 * 切换高级模式
 */
export const triggerAdvanceModeAction = createAsyncAction(
  `${NAMESPACE}/TRIGGER_ADVANCE_MODE_REQUEST`,
  `${NAMESPACE}/TRIGGER_ADVANCE_MODE_SUCCESS`,
  `${NAMESPACE}/TRIGGER_ADVANCE_MODE_FAILURE`
)<void, boolean, void>();
