// 自增
export const increment = () => {
  return {
    type: 'INCREMENT',
  };
};

// 异步自增（等待1秒才触发自增action）
export const incrementAsync = () => {
  return {
    type: 'INCREMENT_ASYNC',
  };
};
