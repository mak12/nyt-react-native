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
import {
  AtuhActions,
  authCreateAccount,
  authLogin,
} from '@redux/reducer/AuthSlice';
import isEqual from 'react-fast-compare';
import {Box, Button, Center, Input, VStack, Text, Heading} from 'native-base';
import {fetchArticles} from '@redux/reducer/ArticlesSlice';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Loader} from '@common/Loader';
import {AuthInput} from '@common/authInput';

interface Styles {
  main: ViewStyle;
}

type CreateAccountScreenProps = NativeStackScreenProps<
  RootStackParamList,
  APP_SCREEN.CREATE_ACC
>;
type CreateAccountScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  APP_SCREEN.CREATE_ACC
>;
interface CreateAccFormValues {
  email: string;
  password: string;
}
const CreatAccValidation = Yup.object().shape({
  password: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});
const CreateAccountScreenComp: React.FC<CreateAccountScreenProps> = () => {
  const navigation = useNavigation<CreateAccountScreenNavigationProps>();
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector(x => x.auth);
  const initialValues: CreateAccFormValues = {email: '', password: ''};

  useEffect(() => {}, []);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CreatAccValidation}
      onSubmit={values => {
        dispatch(
          authCreateAccount({
            email: values.email,
            password: values.password,
          }),
        );
      }}>
      {({errors, handleChange, handleBlur, handleSubmit, values}) => (
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
              <Text color={colors.white}>Register Account</Text>
            </Button>
            <Text
              onPress={() => navigation.goBack()}
              mt={'3'}
              textAlign={'center'}
              underline
              color={'blue.400'}>
              Login
            </Text>
          </VStack>
          <Loader isLoading={loading} />
        </Box>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create<Styles>({
  main: {flex: 1, backgroundColor: colors.white},
});

export const CreateAccountScreen = memo(CreateAccountScreenComp, isEqual);
