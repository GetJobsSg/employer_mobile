import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, takeLatest, takeLeading } from 'redux-saga/effects';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { authTransformer } from './transformer';
import { authActions, authSlice } from './slice';
import { getProfile } from './apis';

import { ILoginCredential } from './types';
import { ICurrentUserInfo } from './slice/types';
import { ICurrentUserInfoResponse } from './apis/types';

const fireAuth = auth();

function* loginSaga(action: PayloadAction<ILoginCredential>) {
  try {
    const { email, password } = action.payload;
    yield call([fireAuth, fireAuth.signInWithEmailAndPassword], email, password);
    yield put(authActions.loginSuccess());
  } catch (e) {
    yield put(authActions.loginError(e));
  }
}

function* setCurrentUserSaga(action: PayloadAction<FirebaseAuthTypes.User | null>) {
  const user = action.payload;
  if (!user) {
    yield put(authActions.reset());
    return;
  }

  try {
    const token: string = yield call([user, user.getIdToken]);
    yield put(authSlice.actions.setCurrentUserAuthInfo(token));

    const res: ICurrentUserInfoResponse = yield call(getProfile);
    const currentUser: ICurrentUserInfo = authTransformer.toState(res);
    yield put(authActions.setCurrentUserSuccess(currentUser));
  } catch (e) {
    yield 'Apis call to retrieve user info failed';
  }
}

function* logoutSaga() {
  try {
    yield call([fireAuth, fireAuth.signOut]);
    yield put(authActions.logoutSuccess());
  } catch (e) {
    yield put(authActions.logoutError(e));
  }
}

function* watchAuthSaga() {
  yield takeLeading(authActions.login.type, loginSaga);
  yield takeLeading(authActions.logout.type, logoutSaga);
  yield takeLatest(authActions.setCurrentUser.type, setCurrentUserSaga);
}

export default [fork(watchAuthSaga)];
