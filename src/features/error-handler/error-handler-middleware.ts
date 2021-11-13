import { Dispatch } from 'redux';
import { store } from 'src/store';
import { errorHandlerActions } from './slices';

const errorHandlingMiddleware = () => (next: Dispatch) => (action: any) => {
  const error = action.payload?.error;
  if (error instanceof Error) {
    const errorMessage = error?.message || 'Something went wrong. Please try again later';
    store.dispatch(errorHandlerActions.showError({ message: errorMessage }));
  } else {
    next(action);
  }
};

export default errorHandlingMiddleware;
