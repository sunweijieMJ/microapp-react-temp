import storage from '@/utils/storage';

/**
 * 设置登录态
 */
export const setLoginToken = ({ session_id }: { session_id: string }) => {
  const expires = new Date(Date.now() + 365 * 24 * 3600000);
  storage('cookie').set('session_id', session_id, expires);
};

/**
 * 移除登录态
 */
export const removeLoginToken = () => {
  storage('cookie').remove('session_id');
};
