import { call, delay, put, takeLatest } from 'redux-saga/effects';
import {
  getGlobalConfigAction,
  getRealDateTimeAction,
} from '../actions/global';
import { GlobalService } from '@/api/index';
import { message } from '@/components/StaticFunction';

/**
 * 获取实时日期时间
 */
function* getRealDateTimeWorker() {
  while (true) {
    const currentDateTime = new Date();
    yield put(getRealDateTimeAction.success(currentDateTime));
    yield delay(1000);
  }
}

/**
 * 获取配置数据
 */
function* getGlobalConfigWorker() {
  try {
    const res: SagaEffectReturn<typeof GlobalService.getGlobalConfig> =
      yield call(GlobalService.getGlobalConfig);
    if (res.data.rtn !== 0) {
      message.error(res.data.message);
    } else {
      yield put(getGlobalConfigAction.success(res.data.results));
    }
  } catch (error) {
    console.error(error);
  }
}

export default function* rootSaga() {
  yield takeLatest(getRealDateTimeAction.request, getRealDateTimeWorker);
  yield takeLatest(getGlobalConfigAction.request, getGlobalConfigWorker);
}
