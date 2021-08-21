import { authReducers } from 'src/features/auth/slice';
import { stripeReducers } from 'src/features/stripe/slice';
import { jobListingReducers } from 'src/features/job-listings/slice';
import { participantListingReducers } from './features/participant-listings/slice';
import { jobDetailsReducers } from './features/job-details/slice';
import { workerListingReducers } from './features/worker-listings/slice';

const rootReducer = {
  auth: authReducers,
  stripePayment: stripeReducers,
  jobListings: jobListingReducers,
  workerListings: workerListingReducers,
  participantListings: participantListingReducers,
  jobDetails: jobDetailsReducers,
};

export default rootReducer;
