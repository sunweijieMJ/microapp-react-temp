import { call, put, takeLatest } from 'redux-saga/effects';
import { putGlobalConfigAction } from './action';
import { GlobalService } from '@/api';
import { message } from '@/components/StaticFunction';
import { getGlobalConfigAction } from '@/redux/actions/global';

/**
 * 设置全局配置
 */
function* putGlobalConfigWorker(
  action: ReturnType<typeof putGlobalConfigAction.request>
) {
  try {
    const { payload } = action;
    const res: SagaEffectReturn<typeof GlobalService.putGlobalConfig> =
      yield call(GlobalService.putGlobalConfig, payload);
    if (res.data.rtn !== 0) {
      message.error(res.data.message);
    } else {
      yield put(getGlobalConfigAction.request());
    }
  } catch (error) {
    console.error(error);
  }
}

export default function* rootSaga() {
  yield takeLatest(putGlobalConfigAction.request, putGlobalConfigWorker);
}
