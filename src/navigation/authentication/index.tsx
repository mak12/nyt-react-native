import React, {FC, memo, useCallback, useEffect} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {StatusBar, View} from 'react-native';
import {useAppSelector} from '@redux/hooks';
import {LoginScreen} from '@screens/auth/LoginScreen';

import {APP_SCREEN, RootStackParamList} from '@utilities/types';
import {dispatch} from '@common/redux';
import isEqual from 'react-fast-compare';
import {CreateAccountScreen} from '@components/screens/auth/CreateAccountScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthenticationTab: FC = () => {
  const options: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
    <View style={{flex: 1}}>
      <Stack.Navigator
        screenOptions={{headerShown: false, gestureEnabled: true}}
        initialRouteName={APP_SCREEN.LOGIN}>
        <Stack.Screen
          name={APP_SCREEN.LOGIN}
          component={LoginScreen}
          options={options}
        />
        <Stack.Screen
          name={APP_SCREEN.CREATE_ACC}
          component={CreateAccountScreen}
          options={options}
        />
      </Stack.Navigator>
    </View>
  );
};

export const Authentication = memo(AuthenticationTab, isEqual);
