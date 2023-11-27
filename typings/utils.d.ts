import { SagaReturnType } from 'redux-saga/effects';

declare global {
  /**
   * saga返回值类型(SagaReturnType)
   */
  type SR<T extends (...args: any[]) => any> = SagaReturnType<T>;

  /**
   * 对象值的类型
   */
  export type ValueOf<T> = T[keyof T];

  /**
   * 类型所有项可选
   */
  type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
  };

  /**
   * 互斥类型
   */
  export type Mutex<IRequired, IPickOnlyOne> = IRequired &
    RequireOnlyOne<IPickOnlyOne>;
}
