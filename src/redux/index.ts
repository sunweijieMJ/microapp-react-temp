import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import persistedReducer from './persist';
import rootReducer from '@/redux/reducers';
import rootSaga, { injectAsyncSaga } from '@/redux/saga';
import { APP_NAME } from '@/utils/contant/global';

/**
 * Root类型
 */
export type RootState = ReturnType<typeof rootReducer>;

/**
 * 初始化store
 */
export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  // redux-devtools扩展
  const composeEnhancers = composeWithDevTools({
    name: APP_NAME,
  });

  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

  /**
   * 全局store
   */
  const store = createStore(persistedReducer, enhancer);

  /**
   * 持久化store
   */
  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);
  injectAsyncSaga(store, sagaMiddleware);

  return { store, persistor };
}
