import React, {memo, useEffect} from 'react';
import {View, ViewStyle, StyleSheet} from 'react-native';
import {colors} from '@themes/colors';

import {APP_SCREEN, RootStackParamList} from '@utilities/types';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {authLogin} from '@redux/reducer/AuthSlice';
import isEqual from 'react-fast-compare';
import {Box, Button, Center, Input, VStack, Text, Heading} from 'native-base';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Loader} from '@common/Loader';
import {AuthInput} from '@common/authInput';

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
interface LoginFormValues {
  email: string;
  password: string;
}
const LoginValidation = Yup.object().shape({
  password: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});
const LoginScreenComp: React.FC<LoginScreenProps> = () => {
  const navigation = useNavigation<LoginScreenNavigationProps>();
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector(x => x.auth);
  const initialValues: LoginFormValues = {email: '', password: ''};

  useEffect(() => {}, []);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginValidation}
      onSubmit={values => {
        dispatch(
          authLogin({
            email: values.email,
            password: values.password,
          }),
        );
      }}>
      {({errors, handleChange, handleBlur, handleSubmit, values}) => (
        <>
          {console.log('errros ', errors.email)}
          <Box flex={1}>
            <Heading mt={'20'} textAlign={'center'}>
              NewYork Times
            </Heading>
            <VStack flex={1} marginX={'10'} justifyContent="center">
              <AuthInput
                variant="outline"
                placeholder="Enter email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                fontSize="md"
                keyboardType="email-address"
                mb={5}
                error={errors.email}
              />
              <AuthInput
                variant="outline"
                placeholder="Enter password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                fontSize="md"
                returnKeyType="done"
                type="password"
                error={errors.password}
              />

              <Button mt={'5'} onPress={() => handleSubmit()}>
                <Text color={colors.white}>Login</Text>
              </Button>
              <Text
                onPress={() => navigation.navigate(APP_SCREEN.CREATE_ACC)}
                mt={'3'}
                textAlign={'center'}
                underline
                color={'blue.400'}>
                Create Account
              </Text>
            </VStack>
            <Loader isLoading={loading} />
          </Box>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create<Styles>({
  main: {flex: 1, backgroundColor: colors.white},
});

export const LoginScreen = memo(LoginScreenComp, isEqual);
