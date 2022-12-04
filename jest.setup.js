// Mocking AsyncStorage for Jest
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native', () => {
  return {
    StyleSheet: {
      create: () => ({}),
    },
  };
});
jest.mock('react-redux', () => ({
  connect: () => jest.fn(),
  useSelector: jest.fn(fn => fn()),
  useDispatch: () => jest.fn(),
}));
// Enzyme.configure({adapter: new Adapter()});

// jest.mock('react-native/Libraries/Utilities/Platform', () => {
//   let platform = {
//     OS: 'android',
//   };

//   const select = jest.fn().mockImplementation(obj => {
//     const value = obj[platform.OS];
//     return !value ? obj.default : value;
//   });

//   platform.select = select;

//   return platform;
// });
jest.mock('redux-persist/lib/createPersistoid', () =>
  jest.fn(() => ({
    update: jest.fn(),
    flush: jest.fn(),
  })),
);

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
  };
});

const _getStoreName = options =>
  options.sharedPreferencesName || options.keychainService || 'default';
jest.mock('react-native-sensitive-info', () => ({
  // your mock here

  __INTERNAL_MOCK_STORAGE__: {},

  getItem: () =>
    jest.fn(async (key, options) => {
      const storeName = _getStoreName(options);

      const result = this.__INTERNAL_MOCK_STORAGE__[storeName]
        ? this.__INTERNAL_MOCK_STORAGE__[storeName][key]
        : undefined;

      return result;
    }),

  setItem: () =>
    jest.fn(async (key, value, options) => {
      const storeName = _getStoreName(options);

      if (this.__INTERNAL_MOCK_STORAGE__[storeName] === undefined) {
        this.__INTERNAL_MOCK_STORAGE__[storeName] = {};
      }

      this.__INTERNAL_MOCK_STORAGE__[storeName][key] = value;
      return null;
    }),
}));
