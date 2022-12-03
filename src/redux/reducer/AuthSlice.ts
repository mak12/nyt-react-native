import {SLICE_NAME} from '@models/generalTypes';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
interface AppState {
  token: string;
  apiKey: string;
  loading: boolean;
  isLoggedIn: boolean;
  theme: {
    dark: boolean;
  };
}

const initialAppState: AppState = {
  token: '',
  apiKey: 'ICxd0MYYrICg7EzbsFcV6bfioi3WH65k',
  isLoggedIn: false,
  loading: false,
  theme: {
    dark: false,
  },
};

const authSlice = createSlice({
  name: SLICE_NAME.AUTH,
  initialState: initialAppState,
  reducers: {
    onSetToken: (state, {payload}: PayloadAction<string>) => {
      state.token = payload;
    },
    onLogout: state => {
      state.token = '';
      state.isLoggedIn = false;
    },
    onLogin: state => {
      state.isLoggedIn = true;
    },
    onLoadApp: state => {
      state.loading = true;
    },
    onLoadAppEnd: state => {
      state.loading = false;
    },
    onSetDarkMode: (state, {payload}: PayloadAction<boolean>) => {
      state.theme.dark = payload;
    },
  },
});

export const AuthReducer = authSlice.reducer;

export const AtuhActions = {
  ...authSlice.actions,
};
