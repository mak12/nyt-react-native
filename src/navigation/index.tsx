import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '@redux/hooks';
import {RootNavigation} from './RootNavigator';

const AppNavigation: React.FC = () => {
  const {token, isLoggedIn} = useAppSelector(x => x.auth);
  return (
    <>
      <NavigationContainer>
        <RootNavigation isLoggedIn={isLoggedIn} />
      </NavigationContainer>
    </>
  );
};
// had to add extra HomeNavi component to avoid render few hooks error will look into this further
export default AppNavigation;
