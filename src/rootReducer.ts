import { authReducers } from 'src/features/auth/slice';
import { stripeReducers } from 'src/features/stripe/slice';
import { jobListingReducers } from 'src/features/job-listings/slice';

const rootReducer = {
  auth: authReducers,
  stripePayment: stripeReducers,
  jobListings: jobListingReducers,
};

export default rootReducer;
