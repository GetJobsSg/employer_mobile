import { Action, Dispatch } from 'redux';

const errorHandler = () => (next: Dispatch) => (action: Action) => next(action);

export default errorHandler;
