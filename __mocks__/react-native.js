import * as ReactNative from 'react-native';

export const alert = jest.fn();
export const Alert = {alert};

export const dimensionWidth = 100;
export const Dimensions = {
  get: jest.fn().mockReturnValue({width: dimensionWidth, height: 100}),
};

export const Image = 'Image';

export const keyboardDismiss = jest.fn();
export const Keyboard = {
  dismiss: keyboardDismiss,
};

let platformlocal = {
  OS: 'android',
};
const select = jest.fn().mockImplementation(obj => {
  const value = obj[platformlocal.OS];
  return !value ? obj.default : value;
});

export const Platform = {
  ...ReactNative.Platform,
  OS: 'android',
  Version: 123,
  isTesting: true,
  select: select,
};

export const StyleSheet = {
  ...ReactNative.StyleSheet,
  create: () => ({}),
};
export default Object.setPrototypeOf(
  {
    Alert,
    Dimensions,
    Image,
    Keyboard,
    Platform,
    StyleSheet,
  },
  ReactNative,
);
