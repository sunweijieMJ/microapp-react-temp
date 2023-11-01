import type { Store } from 'redux';
import type { SagaMiddleware } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { getModules } from '../modules';
import globalSaga from './global';
import loopSaga from './loop';
import systemSaga from './system';
import userSaga from './user';

const subModules = getModules();

export default function* rootSaga() {
  yield all([
    fork(systemSaga),
    fork(userSaga),
    fork(globalSaga),
    fork(loopSaga),
  ]);
}

/**
 * 启动saga
 */
export const injectAsyncSaga = (
  store: Store,
  sagaMiddleware: SagaMiddleware<object>
) => {
  const asyncSagas = new Map();
  subModules.forEach((item) => {
    if (asyncSagas.has(item.namespace)) {
      console.warn('saga已存在');
      return;
    }
    asyncSagas.set(item.namespace, item.saga);
    if (store) {
      sagaMiddleware.run(item.saga);
    }
  });
};
