import update from 'immutability-helper';
import { ActionType, createReducer } from 'typesafe-actions';
import {
  NAMESPACE,
  resetSystemReducerAction,
  triggerAdvanceModeAction,
  updateLocaleAction,
  updateThemeStylemAction,
} from '../actions/system';
import { LocaleKey, ThemeStyleKey } from '@/interface';
import { DEFAULT_LOCALE, DEFAULT_THEME_STYLE } from '@/utils/contant/global';

export type ISystemAction = ActionType<typeof import('../actions/system')>;

export type ISystemState = Readonly<{
  localeSymbol: LocaleKey;
  themeSymbol: ThemeStyleKey;
  advanceMode: boolean;
}>;

const initState: ISystemState = {
  localeSymbol: DEFAULT_LOCALE,
  themeSymbol: DEFAULT_THEME_STYLE,
  advanceMode: false,
};

const reducer = createReducer<ISystemState, ISystemAction>(initState)
  .handleAction(resetSystemReducerAction, () => {
    return initState;
  })
  .handleAction(updateLocaleAction, (state, action) => {
    return update(state, {
      localeSymbol: {
        $set: action.payload,
      },
    });
  })
  .handleAction(updateThemeStylemAction, (state, action) => {
    return update(state, {
      themeSymbol: {
        $set: action.payload,
      },
    });
  })
  .handleAction(triggerAdvanceModeAction.success, (state, action) => {
    return update(state, {
      advanceMode: {
        $set: action.payload,
      },
    });
  });

const reducerModule = {
  [NAMESPACE]: reducer,
};
export default reducerModule;
