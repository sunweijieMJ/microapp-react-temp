import { defineMessages } from 'react-intl';
import { delay, fork, put, race, select, take } from 'redux-saga/effects';
import { triggerAdvanceModeAction } from '../actions/system';
import { message } from '@/components/StaticFunction';
import { intl } from '@/plugins/locale';
import { advanceModeSelector } from '@/redux/selector/system';
import { userInfoSelector } from '@/redux/selector/user';

const MESSAGE = defineMessages({
  advanced_mode: {
    id: 'saga_system_b12412ca',
    defaultMessage: '高级模式已开启',
  },
});

/**
 * 切换高级模式
 */
function* triggerAdvanceModeWorker() {
  const TRIGGER_THRESHOLD = 5 - 1;
  let triggerCountDown = TRIGGER_THRESHOLD;

  while (true) {
    yield take(triggerAdvanceModeAction.request);
    const userInfo: SR<typeof userInfoSelector> = yield select(
      userInfoSelector
    );
    // TODO可根据用户角色来限制使用高级模式
    if (!userInfo?.name) {
      continue;
    }
    while (triggerCountDown) {
      const { trigger } = yield race({
        timeout: delay(1000),
        trigger: take(triggerAdvanceModeAction.request),
      });
      if (trigger) {
        triggerCountDown -= 1;
      } else {
        break;
      }
    }
    const advanceMode: SR<typeof advanceModeSelector> = yield select(
      advanceModeSelector
    );
    // 开启高级模式
    if (!triggerCountDown && !advanceMode) {
      yield put(triggerAdvanceModeAction.success(true));
      message.success(intl.formatMessage(MESSAGE.advanced_mode));
    }
    triggerCountDown = TRIGGER_THRESHOLD;
  }
}

export default function* rootSaga() {
  yield fork(triggerAdvanceModeWorker);
}
