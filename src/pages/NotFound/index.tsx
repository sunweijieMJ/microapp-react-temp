import classNames from 'classnames';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import cssModule from './index.module.scss';

interface IProps {
  className?: string;
}

const NotFound: React.FC<IProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cssModule.container, className)}>
      <FormattedMessage defaultMessage="404" id="NotFound_index_4f4adcbf" />
    </div>
  );
};

export default NotFound;
