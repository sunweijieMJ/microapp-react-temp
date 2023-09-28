import React from 'react';
import { FallbackProps } from 'react-error-boundary';

type IProps = FallbackProps;

/**
 * 错误回调组件
 */
const ErrorFallback: React.FC<IProps> = (props) => {
  const { error, resetErrorBoundary } = props;
  return (
    <div>
      <h2>Something went wrong</h2>
      <p>{error && error.toString()}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default ErrorFallback;
