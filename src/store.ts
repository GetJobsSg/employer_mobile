import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import rootReducer from 'src/rootReducer';
import rootSaga from 'src/rootSaga';

import { authActions } from 'src/features/auth/slice';

const sagaMiddleware = createSagaMiddleware();

const options = {
  serializableCheck: {
    // allow setCurrentUser actions to pass non-serializable value
    ignoredActions: [authActions.setCurrentUser.type],
  },
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: () => {
    if (__DEV__) return getDefaultMiddleware(options).concat([logger, sagaMiddleware]);
    return getDefaultMiddleware(options).concat(sagaMiddleware);
  },
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
