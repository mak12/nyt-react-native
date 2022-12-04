/**
 * @format
 */
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {AuthState, initialAppState} from '@redux/reducer/AuthSlice';
import storeConfig, {RootState} from '@redux/store';
import {LoginScreen} from '@screens/auth/LoginScreen';
import {APP_SCREEN, RootStackParamList} from '@utilities/types';
import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import {Provider} from 'react-redux';
import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';

// Note: test renderer must be required after react-native.
import {render} from './../src/utilities/test-utils';
type NavigationScreenPropAlias = NativeStackScreenProps<
  RootStackParamList,
  APP_SCREEN.LOGIN
>;

// const createTestProps = (props: Object) => ({
//   navigation: {
//     navigate: jest.fn(),
//   },
//   ...props,
// });
// it('renders correctly', () => {
//   const props = createTestProps({});
//   let navigation: Partial<NavigationScreenPropAlias> = {};

//   render(<LoginScreen />);
// });

// describe('Film', () => {
//   const mockStore = configureStore<AuthState>([]);
//   const {persistor} = storeConfig();
//   let store: MockStoreEnhanced<AuthState>;

//   beforeEach(() => {
//     store = mockStore(initialAppState);
//     store.dispatch = jest.fn();
//   });

//   it('should render successfully', () => {
//     const {container} = render(
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <LoginScreen />
//         </PersistGate>
//       </Provider>,
//     );
//     expect(container).toBeTruthy();
//   });
// });
