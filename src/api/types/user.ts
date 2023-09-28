import type { IResponse } from './index';
import type { IUserInfo } from '@/interface';

export interface ILoginRequest {
  name: string;
  password: string;
}

export interface ILoginResponse extends IResponse {
  session_id: string;
}

export interface IGetUserInfoResponse extends IResponse {
  results: IUserInfo;
}
