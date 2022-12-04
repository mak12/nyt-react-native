/**
 * @format
 */
import App from '../App';

// Note: test renderer must be required after react-native.
import {render} from './../src/utilities/test-utils';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import storeConfig from '@redux/store';
// it('renders correctly', () => {
//   const {store, persistor} = storeConfig();
//   render(
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <App />
//       </PersistGate>
//     </Provider>,
//   );
// });
