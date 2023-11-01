import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import cssModule from './index.module.scss';

/**
 * @property error
 * @property resetErrorBoundary
 */
type IProps = FallbackProps;

/**
 * 错误回调组件
 */
const ErrorFallback: React.FC<IProps> = (props) => {
  const { error, resetErrorBoundary } = props;

  return (
    <div className={cssModule.ErrorFallbackWrap}>
      <h2 className={cssModule.ErrorFallbackTitle}>Something went wrong</h2>
      <p className={cssModule.ErrorFallbackMessage}>
        {error && error.toString()}
      </p>
      <button
        className={cssModule.ErrorFallbackBtn}
        onClick={resetErrorBoundary}
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorFallback;
