import { authReducers } from 'src/features/auth/slice';
import { stripeReducers } from 'src/features/stripe/slice';

const rootReducer = {
  auth: authReducers,
  stripePayment: stripeReducers,
};

export default rootReducer;
