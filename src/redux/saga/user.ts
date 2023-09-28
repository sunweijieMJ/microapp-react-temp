import { defineMessages } from 'react-intl';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { resetSystemReducerAction } from '../actions/system';
import {
  getUserInfoAction,
  triggerLoginAction,
  triggerLogoutAction,
} from '../actions/user';
import { UserService } from '@/api/index';
import { message } from '@/components/StaticFunction';
import { intl } from '@/plugins/locale';
import configureStore from '@/redux';
import {
  LOGIN_DEFAULT_ROUTE,
  LOGOUT_DEFAULT_ROUTE,
} from '@/utils/contant/global';
import { removeLoginToken, setLoginToken } from '@/utils/tools/user';

const MESSAGE = defineMessages({
  login_success: {
    id: 'saga_user_71fa3bd0',
    defaultMessage: '登录成功',
  },
  logout_success: {
    id: 'saga_user_adfb20e4',
    defaultMessage: '登出成功',
  },
});

/**
 * 登录
 */
function* triggerLoginWorker(
  action: ReturnType<typeof triggerLoginAction.request>
) {
  try {
    const {
      navigate,
      targetUrl = LOGIN_DEFAULT_ROUTE,
      name,
      password,
    } = action.payload;
    const res: SagaEffectReturn<typeof UserService.login> = yield call(
      UserService.login,
      {
        name,
        password,
      }
    );
    if (res.data.rtn !== 0) {
      message.error(res.data.message);
      if (navigate) {
        // 避免免密登录失败卡住
        navigate(LOGOUT_DEFAULT_ROUTE);
      }
    } else {
      setLoginToken({
        session_id: res.data.session_id,
      });
      yield put(triggerLoginAction.success(res.data));
      yield put(getUserInfoAction.request());
      message.success(intl.formatMessage(MESSAGE.login_success));
      // delay防止接口拿不到token
      yield delay(100);
      if (navigate) {
        navigate(targetUrl);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * 登出
 */
function* triggerLogoutWorker(
  action: ReturnType<typeof triggerLogoutAction.request>
) {
  try {
    const { navigate, targetUrl = LOGOUT_DEFAULT_ROUTE } = action.payload;
    const res: SagaEffectReturn<typeof UserService.logout> = yield call(
      UserService.logout
    );
    if (res.data.rtn !== 0) {
      message.error(res.data.message);
    } else {
      // 清除持久化
      const { persistor } = configureStore();
      persistor.purge();
      yield put(resetSystemReducerAction());
      // 清除token
      removeLoginToken();
      yield put(triggerLogoutAction.success());
      message.success(intl.formatMessage(MESSAGE.logout_success));
      if (navigate) {
        navigate(targetUrl);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * 获取用户信息
 */
function* getUserInfoWorker() {
  try {
    const res: SagaEffectReturn<typeof UserService.getUserInfo> = yield call(
      UserService.getUserInfo
    );
    if (res.data.rtn !== 0) {
      message.error(res.data.message);
    } else {
      yield put(getUserInfoAction.success(res.data.results));
    }
  } catch (error) {
    console.error(error);
  }
}

export default function* rootSaga() {
  yield takeLatest(triggerLoginAction.request, triggerLoginWorker);
  yield takeLatest(triggerLogoutAction.request, triggerLogoutWorker);
  yield takeLatest(getUserInfoAction.request, getUserInfoWorker);
}
