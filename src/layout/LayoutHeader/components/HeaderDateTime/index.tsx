import classnames from 'classnames';
import React from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';
import { useSelector } from 'react-redux';
import cssModule from './index.module.scss';
import { realDateTimeSelector } from '@/redux/selector/global';

interface IProps {
  className?: string;
}

const HeaderDateTime: React.FC<IProps> = (props) => {
  const { className } = props;
  const realDateTime = useSelector(realDateTimeSelector);

  return (
    <div className={classnames(className, cssModule.HeaderDateTime)}>
      <div className={cssModule.HeaderDate}>
        <span>
          <FormattedDate
            value={realDateTime}
            year="numeric"
            month="long"
            day="numeric"
          />
        </span>
        <span className={cssModule.HeaderDateWeekday}>
          <FormattedDate value={realDateTime} weekday="long" />
        </span>
      </div>
      <div className={cssModule.HeaderTime}>
        <FormattedTime
          value={realDateTime}
          hour12={false}
          hour="2-digit"
          minute="2-digit"
          second="2-digit"
        />
      </div>
    </div>
  );
};

export default HeaderDateTime;
