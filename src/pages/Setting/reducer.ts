import { ActionType, createReducer } from 'typesafe-actions';

export type ISettingAction = ActionType<typeof import('./action')>;

export type ISettingState = Readonly<{
  test: string;
}>;

export const initState: ISettingState = {
  test: 'xxx',
};

const reducer = createReducer<ISettingState, ISettingAction>(initState);

export default reducer;
