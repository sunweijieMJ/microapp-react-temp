import { AsyncGroupCreator } from 'flux-payload-action';
import { ILoginRequest, ILoginResponse } from '@/api/types';

/**
 * 登录
 */
export const triggerLoginAction = AsyncGroupCreator<
  ILoginRequest,
  ILoginResponse,
  void
>('LOGIN_ACTION');
