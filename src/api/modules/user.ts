import AxiosInstance from '../instance';
import type {
  IGetUserInfoResponse,
  ILoginRequest,
  ILoginResponse,
} from '../types';
import { PROXY_URI } from '@/utils/contant/global';

const Dict = {
  login: `${PROXY_URI.MOCK}/login`,
  logout: `${PROXY_URI.MOCK}/logout`,
  getUserInfo: `${PROXY_URI.MOCK}/userInfo`,
} as const;

const UserService = {
  /**
   * 登录
   * @param data
   * @returns
   */
  login(data: ILoginRequest) {
    return AxiosInstance.post<ILoginResponse>(Dict.login, data);
  },

  /**
   * 登出
   * @returns
   */
  logout() {
    return AxiosInstance.get<ILoginResponse>(Dict.logout);
  },

  /**
   * 获取用户信息
   * @param data
   * @returns
   */
  getUserInfo() {
    return AxiosInstance.get<IGetUserInfoResponse>(Dict.getUserInfo);
  },
};

export default UserService;
