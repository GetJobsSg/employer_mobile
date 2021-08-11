export interface IParticipant {
  id: number;
  name: string;
  gender: string;
  age: number;
  ratings: string;
  profileImage: string;
  mobile: string;

  isSendingOffer?: boolean;
  isRejecting?: boolean;
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

export interface IOfferJobPayload {
  jobId: number;
  jobseekerId: number;
}

export interface IRejectPayload {
  jobId: number;
  jobseekerId: number;
}
