import AxiosInstance from '../instance';
import type {
  IGetGlobalConfigResponse,
  IPutGlobalConfigRequest,
} from '../types';
import { PROXY_URI } from '@/utils/contant/global';

const Dict = {
  globalConfig: `${PROXY_URI.MOCK}/globalConfig`, // 获取配置数据
} as const;

const GlobalService = {
  /**
   * 获取配置数据
   * @returns
   */
  getGlobalConfig() {
    return AxiosInstance.get<IGetGlobalConfigResponse>(`${Dict.globalConfig}`);
  },

  /**
   * 设置配置数据
   * @returns
   */
  putGlobalConfig(data: IPutGlobalConfigRequest) {
    return AxiosInstance.put(`${Dict.globalConfig}`, data);
  },
};

export default GlobalService;
