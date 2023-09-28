import update from 'immutability-helper';
import { ActionType, createReducer } from 'typesafe-actions';
import {
  getGlobalConfigAction,
  getRealDateTimeAction,
  NAMESPACE,
} from '../actions/global';
import { IGetGlobalConfigResponse } from '@/api/types';
import { IHeaderNavList } from '@/interface';
import { DEFAULT_HEADER_NAV_LIST } from '@/utils/contant/global';

export type IGlobalAction = ActionType<typeof import('../actions/global')>;

export type IGlobalState = Readonly<{
  realDateTime: Date;
  globalConfig?: IGetGlobalConfigResponse['results'];
  headerNavList: IHeaderNavList[];
}>;

const initState: IGlobalState = {
  realDateTime: new Date(),
  globalConfig: undefined,
  headerNavList: DEFAULT_HEADER_NAV_LIST,
};

const reducer = createReducer<IGlobalState, IGlobalAction>(initState)
  .handleAction(getRealDateTimeAction.success, (state, action) => {
    return update(state, {
      realDateTime: {
        $set: action.payload,
      },
    });
  })
  .handleAction(getGlobalConfigAction.success, (state, action) => {
    return update(state, {
      globalConfig: {
        $set: action.payload,
      },
    });
  });

const reducerModule = {
  [NAMESPACE]: reducer,
};
export default reducerModule;
