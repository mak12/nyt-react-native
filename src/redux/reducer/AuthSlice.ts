import {IAuthResponse} from '@models/APIModels';
import {SLICE_NAME} from '@models/generalTypes';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {APP_URLS} from '@utilities/constants';
import {getExceptionPayload, showAlertDialog} from '@utilities/utils';
import API from '../../lib/API';

export interface AuthState {
  token: string;
  apiKey: string;
  loading: boolean;
  isLoggedIn: boolean;
}

export const initialAppState: AuthState = {
  token: '',
  apiKey: 'ICxd0MYYrICg7EzbsFcV6bfioi3WH65k',
  isLoggedIn: false,
  loading: false,
};

// for login purposes
export const authLogin = createAsyncThunk(
  'nyt/authLogin',
  async ({email, password}: {email: string; password: string}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      API.defaults.baseURL = APP_URLS.BASE_URL_AUTH;
      const response = await API.post<IAuthResponse>('/login', {
        email: email,
        password: password,
      }); //here you fetch data with catgeories
      return await response.data;
    } catch (error) {
      showAlertDialog(getExceptionPayload(error).message);
      return rejectWithValue(getExceptionPayload(error));
    }
  },
);

// for signup purposes
export const authCreateAccount = createAsyncThunk(
  'nyt/authCreateAccount',
  async ({email, password}: {email: string; password: string}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      API.defaults.baseURL = APP_URLS.BASE_URL_AUTH;
      const response = await API.post<IAuthResponse>('/register', {
        email: email,
        password: password,
      }); //here you fetch data with catgeories
      return await response.data;
    } catch (error) {
      showAlertDialog(getExceptionPayload(error).message);
      return rejectWithValue(getExceptionPayload(error));
    }
  },
);

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
  },
  extraReducers: builder => {
    builder.addCase(authLogin.pending, state => {
      state.loading = true;
    }),
      builder.addCase(authLogin.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.token = payload.access_token;
        state.isLoggedIn = true;
        API.defaults.baseURL = APP_URLS.BASE_URL;
      });
    builder.addCase(authLogin.rejected, (state, {payload}) => {
      state.loading = false;
    });
    builder.addCase(authCreateAccount.pending, state => {
      state.loading = true;
    }),
      builder.addCase(authCreateAccount.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.token = payload.access_token;
        state.isLoggedIn = true;
        API.defaults.baseURL = APP_URLS.BASE_URL;
      });
    builder.addCase(authCreateAccount.rejected, (state, {payload}) => {
      state.loading = false;
    });
  },
});

export const AuthReducer = authSlice.reducer;

export const AtuhActions = {
  ...authSlice.actions,
};
