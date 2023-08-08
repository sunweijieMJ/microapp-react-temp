import type { IResponse } from './index';

export interface ILoginRequest {
  name: string;
  password: string;
}

export interface ILoginResponse extends IResponse {
  face_platform_session_id: string;
  session_id: string;
}
