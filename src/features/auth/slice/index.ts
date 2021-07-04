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
      state.user = action.payload;
      state.isLoadingSetCurrentUser = false;
    },
    setCurrentUserError(state, action) {
      state.error = action.payload;
      state.isLoadingSetCurrentUser = false;
    },

    // login
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    login(state, action: PayloadAction<ILoginCredential>) {
      state.isLoadingLogin = true;
      state.error = null;
    },
    loginSuccess(state) {
      state.isLoadingLogin = false;
    },
    loginError(state, action) {
      state.error = action.payload;
    },

    // logout
    logout(state) {
      state.isLoadingLogout = true;
    },
    logoutSuccess(state) {
      state.isLoadingLogout = false;
    },
    logoutError(state, action) {
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
