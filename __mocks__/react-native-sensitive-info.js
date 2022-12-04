const asMock = {
  __INTERNAL_MOCK_STORAGE__: {},

  getItem: jest.fn(async (key, options) => {
    const storeName = _getStoreName(options);

    const result = asMock.__INTERNAL_MOCK_STORAGE__[storeName]
      ? asMock.__INTERNAL_MOCK_STORAGE__[storeName][key]
      : undefined;

    return result;
  }),

  setItem: jest.fn(async (key, value, options) => {
    const storeName = _getStoreName(options);

    if (asMock.__INTERNAL_MOCK_STORAGE__[storeName] === undefined) {
      asMock.__INTERNAL_MOCK_STORAGE__[storeName] = {};
    }

    asMock.__INTERNAL_MOCK_STORAGE__[storeName][key] = value;
    return null;
  }),
};

const _getStoreName = options =>
  options.sharedPreferencesName || options.keychainService || 'default';

module.exports = asMock;
