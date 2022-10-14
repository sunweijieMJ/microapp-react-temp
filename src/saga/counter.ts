import { put, takeEvery, delay } from 'redux-saga/effects';

function* increase() {
  yield delay(1000); // 等待1秒
  yield put({ type: 'INCREMENT' }); // 命令 middleware 向 Store 发起一个 action
}

// 监听异步自增事件
export function* add() {
  yield takeEvery('INCREMENT_ASYNC', increase);
}
