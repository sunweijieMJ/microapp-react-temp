import { Segmented } from 'antd';
import type { SegmentedValue } from 'antd/es/segmented';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeStyleKey } from '@/interface';
import { updateThemeStylemAction } from '@/redux/actions/system';
import { themeSymbolSelector } from '@/redux/selector/system';

const themeOptions = [
  {
    value: 'dark',
    label: 'dark',
  },
  {
    value: 'light',
    icon: 'light',
  },
];

interface IProps {
  className?: string;
}

const ThemeSwitch: React.FC<IProps> = (props) => {
  const { className } = props;
  const dispatch = useDispatch();
  const themeSymbol = useSelector(themeSymbolSelector);

  const handleThemeChange = (value: SegmentedValue) => {
    dispatch(updateThemeStylemAction(value as ThemeStyleKey));
  };

  return (
    <Segmented
      className={className}
      value={themeSymbol}
      options={themeOptions}
      onChange={handleThemeChange}
    />
  );
};

export default ThemeSwitch;
