import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { setItem, removeItem, StorageKey } from 'src/utils/storage';
import { login, logout, sendPasswordResetEmail } from 'src/utils/firebase';

import { authTransformer } from './transformer';
import { authActions, authSlice } from './slice/index';
import { getProfile } from './apis';

import { ILoginCredential } from './types';
import { ICurrentUserInfo } from './slice/types';
import { ICurrentUserInfoResponse } from './apis/types';

function* loginSaga(action: PayloadAction<ILoginCredential>) {
  try {
    const { email, password } = action.payload;
    yield call(login, email, password);
    yield put(authActions.loginSuccess());
  } catch (e) {
    yield put(authActions.loginError(e));
  }
}

function* sendPasswordResetEmailSaga(action: PayloadAction<string>) {
  try {
    const email = action.payload;
    yield call(sendPasswordResetEmail, email);
    yield put(authActions.sendResetPasswordEmailSuccess());
  } catch (e) {
    const err = e as FirebaseAuthTypes.NativeFirebaseAuthError;
    yield put(authActions.sendResetPasswordEmailError({ code: err.code, message: err.message }));
  }
}

function* setCurrentUserSaga(action: PayloadAction<FirebaseAuthTypes.User | null>) {
  const user = action.payload;

  if (!user) {
    // user is logout
    yield put(authActions.reset());
    yield call(removeItem, StorageKey.ACCESS_TOKEN);
    return;
  }

  try {
    // user is login
    const token: string = yield call([user, user.getIdToken]);
    yield put(authSlice.actions.setCurrentUserAuth(token));
    yield call(setItem, StorageKey.ACCESS_TOKEN, token);

    const res: ICurrentUserInfoResponse = yield call(getProfile);
    const currentUser: ICurrentUserInfo = authTransformer.toState(res);
    yield put(authActions.setCurrentUserSuccess(currentUser));
  } catch (e) {
    yield put(authActions.setCurrentUserError(e));
  }
}

function* logoutSaga() {
  try {
    yield call(logout);
    yield put(authActions.logoutSuccess());
  } catch (e) {
    yield put(authActions.logoutError(e));
  }
}

function* watchAuthSaga() {
  yield takeLatest(authActions.login.type, loginSaga);
  yield takeLatest(authActions.logout.type, logoutSaga);
  yield takeLatest(authActions.setCurrentUser.type, setCurrentUserSaga);
  yield takeLatest(authActions.sendResetPasswordEmail.type, sendPasswordResetEmailSaga);
}

const authSaga = [fork(watchAuthSaga)];

export default authSaga;
