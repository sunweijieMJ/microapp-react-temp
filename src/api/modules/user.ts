import Axios from '../instance';
import type { ILoginRequest, ILoginResponse } from '../types';

const Dict = {
  Login: 'resource_manager/user/login',
};

const UserService = {
  /**
   * 登录
   */
  login(data: ILoginRequest) {
    return Axios.post<ILoginResponse>(Dict.Login, data);
  },
};

export default UserService;
