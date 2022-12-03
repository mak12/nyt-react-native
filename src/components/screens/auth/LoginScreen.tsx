import React, {memo, useEffect} from 'react';
import {View, ViewStyle, StyleSheet} from 'react-native';
import {colors} from '@themes/colors';

import {APP_SCREEN, RootStackParamList} from '@utilities/types';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {dispatch} from '@common/redux';
import {AtuhActions} from '@redux/reducer/AuthSlice';
import isEqual from 'react-fast-compare';
import {VStack} from 'native-base';
import {fetchArticles} from '@redux/reducer/ArticlesSlice';
import {useAppDispatch} from '@redux/hooks';

interface Styles {
  main: ViewStyle;
}

type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  APP_SCREEN.LOGIN
>;
type LoginScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  APP_SCREEN.LOGIN
>;
const LoginScreenComp: React.FC<LoginScreenProps> = () => {
  const navigation = useNavigation<LoginScreenNavigationProps>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchArticles('science'));
  }, []);
  return <VStack></VStack>;
};

const styles = StyleSheet.create<Styles>({
  main: {flex: 1, backgroundColor: colors.white},
});

export const LoginScreen = memo(LoginScreenComp, isEqual);
