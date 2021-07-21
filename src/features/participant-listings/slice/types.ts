export interface IParticipant {
  id: string;
  name: string;
  gender: string;
  age: string;
  ratings: string;
}

export interface IParticipantsListingInitialState {
  isLoadingGetAllPendingParticipant: boolean;
  pendingParticipants: IParticipant[];
  errorPendingParticipants: null | any;

  isLoadingGetAllOfferSentPartcipant: boolean;
  offerSentParticipants: IParticipant[];
  errorOfferSentParticipants: null | any;

  isLoadingGetAllAcceptedPartcipant: boolean;
  acceptedParticipants: IParticipant[];
  errorAcceptedParticipants: null | any;

  isLoadingGetAllRejectedPartcipant: boolean;
  rejectedParticipants: IParticipant[];
  errorRejectedParticipants: null | any;
}

export interface IParticipantsPayload {
  list: IParticipant[];
  error: null | any;
}
