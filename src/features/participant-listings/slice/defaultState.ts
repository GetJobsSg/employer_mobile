import { IParticipantsListingInitialState } from './types';

export const participantsListingInitialState: IParticipantsListingInitialState = {
  isLoadingGetAllPendingParticipant: false,
  pendingParticipants: [],
  errorPendingParticipants: null,

  isLoadingGetAllOfferSentPartcipant: false,
  offerSentParticipants: [],
  errorOfferSentParticipants: null,

  isLoadingGetAllAcceptedPartcipant: false,
  acceptedParticipants: [],
  errorAcceptedParticipants: null,

  isLoadingGetAllRejectedPartcipant: false,
  rejectedParticipants: [],
  errorRejectedParticipants: null,
};
