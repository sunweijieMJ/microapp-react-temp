import type { IResponse } from './index';
import type { IGlobalConfig } from '@/interface';

export interface IGetGlobalConfigResponse extends IResponse {
  results: IGlobalConfig;
}

export type IPutGlobalConfigRequest = IGlobalConfig;
