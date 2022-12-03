/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren} from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import storeConfig from './src/redux/store';
import AppNavigator from '@navigation/index';
import {extendTheme, NativeBaseProvider, ColorMode} from 'native-base';

const newColorTheme = {
  brand: {
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
};
const theme = extendTheme({colors: newColorTheme});
const App = () => {
  const {store, persistor} = storeConfig();

  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <NativeBaseProvider theme={theme}>
          <AppNavigator />
        </NativeBaseProvider>
      </Provider>
    </PersistGate>
  );
};

export default App;
