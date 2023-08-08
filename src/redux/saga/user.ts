import { message } from 'antd';
import { call, put, takeLatest } from 'redux-saga/effects';
import { triggerLoginAction } from '../actions/user';
import { UserService } from '@/api';

function* triggerLoginWorker(
  action: ReturnType<typeof triggerLoginAction.request>
) {
  const { payload } = action;
  try {
    const res: SagaEffectReturn<typeof UserService.login> = yield call(
      UserService.login,
      payload
    );
    if (res.data.rtn !== 0) {
      message.error(res.data.message);
    } else {
      message.success('登录成功');
      yield put(triggerLoginAction.success(res.data));
    }
  } catch (error) {
    console.error(error);
  }
}

export default function* userSaga() {
  yield takeLatest(triggerLoginAction.request.match, triggerLoginWorker);
}
