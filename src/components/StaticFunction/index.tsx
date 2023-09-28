import { App } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';

// eslint-disable-next-line import/no-mutable-exports
let message: MessageInstance;
// eslint-disable-next-line import/no-mutable-exports
let notification: NotificationInstance;
// eslint-disable-next-line import/no-mutable-exports
let modal: Omit<ModalStaticFunctions, 'warn'>;

/**
 * antd的静态方法包装(可消费上下文)
 */
const StaticFunction = () => {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;
  return null;
};

export default StaticFunction;

export { message, notification, modal };
