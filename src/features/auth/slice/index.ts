import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILoginCredential } from '../types';
import { ICurrentUserInfo } from './types';
import authInitialState from './defaultState';

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    // set currentUser
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setCurrentUser(state, action: PayloadAction<FirebaseAuthTypes.User | null>) {
      state.isLoadingSetCurrentUser = true;
    },
    setCurrentUserAuth(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setCurrentUserSuccess(state, action: PayloadAction<ICurrentUserInfo>) {
      state.error = null;
      state.user = action.payload;
      state.isLoadingSetCurrentUser = false;
    },
    setCurrentUserError(state, action) {
      state.error = action.payload;
      state.isLoadingSetCurrentUser = false;
    },

    // send reset password email
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendResetPasswordEmail(state, action: PayloadAction<string>) {
      state.isLoadingSendResetPasswordEmail = true;
    },
    sendResetPasswordEmailSuccess(state) {
      state.error = null;
      state.isLoadingSendResetPasswordEmail = false;
    },
    sendResetPasswordEmailError(state, action) {
      state.error = action.payload;
      state.isLoadingSendResetPasswordEmail = false;
    },

    // login
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    login(state, action: PayloadAction<ILoginCredential>) {
      state.isLoadingLogin = true;
    },
    loginSuccess(state) {
      state.error = null;
      state.isLoadingLogin = false;
    },
    loginError(state, action) {
      state.isLoadingLogin = false;
      state.error = action.payload;
    },

    // logout
    logout(state) {
      state.isLoadingLogout = true;
    },
    logoutSuccess(state) {
      state.error = null;
      state.isLoadingLogout = false;
    },
    logoutError(state, action) {
      state.isLoadingLogout = false;
      state.error = action.payload;
    },

    // reset
    reset() {
      return authInitialState;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducers = authSlice.reducer;
