import update from 'immutability-helper';
import { ActionType, createReducer } from 'typesafe-actions';
import {
  getUserInfoAction,
  NAMESPACE,
  triggerLoginAction,
  triggerLogoutAction,
} from '../actions/user';
import { IGetUserInfoResponse, ILoginResponse } from '@/api/types';

export type IUserAction = ActionType<typeof import('../actions/user')>;

export type IUserState = Readonly<{
  loginInfo?: ILoginResponse;
  userInfo?: IGetUserInfoResponse['results'];
}>;

const initState: IUserState = {
  loginInfo: undefined,
  userInfo: undefined,
};

const reducer = createReducer<IUserState, IUserAction>(initState)
  .handleAction(triggerLoginAction.success, (state, action) => {
    return update(state, {
      loginInfo: {
        $set: action.payload,
      },
    });
  })
  .handleAction(triggerLogoutAction.success, (state) => {
    return update(state, {
      loginInfo: {
        $set: undefined,
      },
    });
  })
  .handleAction(getUserInfoAction.success, (state, action) => {
    return update(state, {
      userInfo: {
        $set: action.payload,
      },
    });
  });

const reducerModule = {
  [NAMESPACE]: reducer,
};
export default reducerModule;
