import memoizeOne from 'memoize-one';
import { fork, put, select, take, takeLatest } from 'redux-saga/effects';
import { getGlobalConfigAction } from '../actions/global';
import {
  triggerConfigLoopAction,
  updateConfigLoopAction,
} from '../actions/loop';
import { globalConfigSelector } from '../selector/global';
import { LOOP_STATUS_ENUM, LoopWorker } from '../utils/loop';

/**
 * 轮询间隔时间
 */
const CONFIG_LOOP_INTERVAL = 60 * 1000;

/**
 * 轮询Worker
 */
const configLoopWorker = memoizeOne(
  () =>
    new LoopWorker(
      triggerConfigLoopAction,
      triggerConfigLoopWorker,
      CONFIG_LOOP_INTERVAL
    )
)();

/**
 * 触发轮询
 */
function* triggerConfigLoopWorker() {
  yield put(getGlobalConfigAction.request());
}

/**
 * 更新轮询
 */
function updateConfigLoopWorker(
  action: ReturnType<typeof updateConfigLoopAction>
) {
  const { status, delay } = action.payload;
  if (delay && configLoopWorker.delayTime !== delay) {
    configLoopWorker.setDelayTime(delay);
  }
  switch (status) {
    case LOOP_STATUS_ENUM.CANCELED:
      configLoopWorker.cancel();
      break;
    case LOOP_STATUS_ENUM.PAUSED:
      configLoopWorker.pause();
      break;
    case LOOP_STATUS_ENUM.LOOPING:
      configLoopWorker.reLoop();
      break;
    default:
      break;
  }
}

// 监听轮询延迟时间的变化
function* watchConfigLoopDelayWorker() {
  while (true) {
    yield take(getGlobalConfigAction.request);

    const globalConfig: SR<typeof globalConfigSelector> = yield select(
      globalConfigSelector
    );
    const loopInterval = globalConfig?.loopInterval;

    yield put(updateConfigLoopAction({ delay: loopInterval }));
  }
}

export default function* rootSaga() {
  yield configLoopWorker.loop();
  yield fork(watchConfigLoopDelayWorker);
  yield takeLatest(updateConfigLoopAction, updateConfigLoopWorker);
}
