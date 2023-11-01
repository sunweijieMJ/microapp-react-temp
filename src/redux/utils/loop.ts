import { Action } from 'redux';
import {
  ActionPattern,
  delay as sagaDelay,
  takeLatest,
} from 'redux-saga/effects';

/**
 * 轮询状态的枚举
 */
export enum LOOP_STATUS_ENUM {
  CANCELED = 'CANCELED',
  LOOPING = 'LOOPING',
  PAUSED = 'PAUSED',
}

/**
 * 创建轮询任务的工作器
 */
export class LoopWorker<A extends Action> {
  /**
   * 触发轮询的action模式
   */
  private pattern: ActionPattern<A>;
  /**
   * 轮询中执行的任务函数
   */
  private worker: (action: A) => any;
  /**
   * 轮询的延迟时间
   */
  public delayTime: number;
  /**
   * 指示任务是在轮询前还是轮询后执行
   */
  public after: boolean;
  /**
   * 轮询的状态
   */
  public status: LOOP_STATUS_ENUM = LOOP_STATUS_ENUM.CANCELED;

  /**
   * LoopWorker构造器
   * @param pattern 触发轮询的action模式
   * @param worker 轮询中执行的任务函数
   * @param delay 轮询的延迟时间
   * @param after 指示任务是在轮询前还是轮询后执行
   */
  constructor(
    pattern: ActionPattern<A>,
    worker: (action: A) => any,
    delay: number,
    after = false
  ) {
    this.pattern = pattern;
    this.worker = worker;
    this.delayTime = delay;
    this.after = after;
  }

  /**
   * 生成器函数，可以执行轮询任务。检查轮询状态，并根据需要延迟执行任务和等待
   */
  getWorker = function* (this: LoopWorker<A>, action: A) {
    if (this.status === LOOP_STATUS_ENUM.LOOPING) {
      return;
    }
    this.status = LOOP_STATUS_ENUM.LOOPING;
    while (!this.isCanceled()) {
      if (this.after) {
        yield sagaDelay(this.delayTime);
      }
      if (this.status === LOOP_STATUS_ENUM.LOOPING) {
        yield this.worker(action);
      }
      if (!this.after) {
        yield sagaDelay(this.delayTime);
      }
    }
  };

  /**
   *检查轮询是否已取消
   */
  isCanceled() {
    return this.status === LOOP_STATUS_ENUM.CANCELED;
  }

  /**
   * 取消轮询
   */
  cancel() {
    this.status = LOOP_STATUS_ENUM.CANCELED;
  }

  /**
   * 暂停轮询
   */
  pause() {
    this.status = LOOP_STATUS_ENUM.PAUSED;
  }

  /**
   * 重新开始轮询
   */
  reLoop() {
    this.status = LOOP_STATUS_ENUM.LOOPING;
  }

  /**
   * 设置轮询的延迟时间
   * @param time 延迟时间
   */
  setDelayTime(time: number) {
    this.delayTime = time;
  }

  /**
   * Saga监听器，用于监听指定模式的action，并在触发时调用getWorker方法启动循环
   */
  loop() {
    return takeLatest(this.pattern, this.getWorker.bind(this));
  }
}
