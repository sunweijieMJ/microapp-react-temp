import update from 'immutability-helper';
import { AnyAction } from 'redux';
import { triggerLoginAction } from '../actions/user';
import { ILoginResponse } from '@/api/types';

export type IUserState = Readonly<{
  loginInfo?: ILoginResponse;
}>;

const initState: IUserState = {};

// eslint-disable-next-line default-param-last
const userReducer = (state = initState, action: AnyAction): IUserState => {
  if (triggerLoginAction.success.match(action)) {
    return update(state, {
      loginInfo: {
        $set: action.payload,
      },
    });
  }

  return state;
};

export default userReducer;
