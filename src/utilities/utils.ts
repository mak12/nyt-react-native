import {Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {APP_URLS} from './constants';
import {APIError} from './types';
import {InternalError} from '@lib/API';

//generic alert for messages
export const showAlertDialog = (
  msg?: string,
  title?: string,
  allowCancel?: boolean,
  onOkPressed?: () => void,
) => {
  Alert.alert(
    title ? title : 'NYT ',
    msg,
    allowCancel
      ? [
          {
            text: 'CANCEL',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              onOkPressed && onOkPressed();
            },
            style: 'default',
          },
        ]
      : [
          {
            text: 'OK',
            onPress: () => {},
            style: 'cancel',
          },
        ],
    {
      cancelable: false,
    },
  );
};
export const getExceptionPayload = (ex: unknown): APIError => {
  console.log('err ', ex);
  if (typeof ex !== 'object' || !ex) {
    return InternalError;
  }

  const typedException = ex as APIError;
  if (
    ex.hasOwnProperty('message') &&
    typeof typedException.message === 'string' &&
    ex.hasOwnProperty('code') &&
    typeof typedException.message === 'number'
  ) {
    return {
      message: typedException.message,
      code: typedException.code,
    };
  }

  return InternalError;
};
