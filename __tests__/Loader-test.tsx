import {Loader} from '@common/Loader';
import {render} from './../src/utilities/test-utils';
import {Platform} from 'react-native';
import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import {Provider} from 'react-redux';
import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {AuthState, initialAppState} from '@redux/reducer/AuthSlice';
import storeConfig from '@redux/store';

describe('Film', () => {
  const mockStore = configureStore<AuthState>([]);
  const {persistor} = storeConfig();
  let store: MockStoreEnhanced<AuthState>;

  beforeEach(() => {
    store = mockStore(initialAppState);
    store.dispatch = jest.fn();
  });

  it('renders correctly', () => {
    Platform.OS = 'ios';

    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Loader />
        </PersistGate>
      </Provider>,
    );
  });
});
