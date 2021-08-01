import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import rootReducer from 'src/rootReducer';
import rootSaga from 'src/rootSaga';

import { authActions } from 'src/features/auth/slice';
import { jobDetailsActions } from './features/job-details/slice';

const sagaMiddleware = createSagaMiddleware();

const options = {
  serializableCheck: {
    // Following actions will pass non-serializable value
    // Skip the serializable check as exception
    ignoredActions: [
      authActions.loginError.type,
      authActions.sendResetPasswordEmailError.type,
      authActions.logoutError.type,
      authActions.setCurrentUser.type,
      authActions.setCurrentUserError.type,
      jobDetailsActions.createJobResponse.type,
    ],
  },
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: () => {
    if (__DEV__) return getDefaultMiddleware(options).concat([logger, sagaMiddleware]);
    return getDefaultMiddleware(options).concat([sagaMiddleware]);
  },
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
