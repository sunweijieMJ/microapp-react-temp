import { Effect } from 'redux-saga/effects';

export {};

declare global {
  /**
   * 用于推导saga call, select等effect的返回类型
   * @example const res:SR<typeof api> = yield call(api);
   */
  type SagaEffectReturn<T> = T extends (...args: any[]) => any
    ? ReturnType<T> extends Generator<any, infer K1, any>
      ? Exclude<K1, Effect>
      : ReturnType<T> extends PromiseLike<infer K2>
      ? K2
      : ReturnType<T>
    : never;

  /**
   * alias of SagaEffectReturn
   * 用于推导saga call, select等effect的返回类型
   * @example const res:SR<typeof api> = yield call(api);
   * @example const state:SR<typeof stateSelector> = yield select(stateSelector);
   */
  type SR<T> = SagaEffectReturn<T>;

  /**
   * 获取一个组件的参数类型
   */
  export type InferProps<T extends React.ComponentType> =
    T extends React.ComponentType<infer K> ? K : never;

  /**
   * 获取对象值的类型
   */
  export type ValueOf<T> = T[keyof T];
}
