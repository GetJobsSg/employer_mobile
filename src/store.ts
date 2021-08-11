import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import rootReducer from 'src/rootReducer';
import rootSaga from 'src/rootSaga';

const sagaMiddleware = createSagaMiddleware();

// turn off serializableCheck
const options = { serializableCheck: false };

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
