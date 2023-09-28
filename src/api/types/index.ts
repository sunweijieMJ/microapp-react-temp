import type { AxiosRequestHeaders } from 'axios';

export * from './user';
export * from './global';

export interface IResponse {
  message: string;
  rtn: number;
}

export type CustomRequestHeaders = AxiosRequestHeaders &
  Partial<{
    retryCount: number;
    retryDelay: number;
  }>;
