import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import cssModule from './index.module.scss';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //
  }, [dispatch]);

  return <div className={cssModule.HomePage}>HomePage</div>;
};

export default HomePage;
