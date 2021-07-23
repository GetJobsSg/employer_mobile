import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { participantsListingInitialState } from './defaultState';
import { IParticipantsPayload } from './types';

const participantsListingSlice = createSlice({
  name: 'participantListing',
  initialState: participantsListingInitialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAllPendingParticipantRequest(state, action: PayloadAction<{ jobId: number }>) {
      state.isLoadingGetAllPendingParticipant = true;
    },
    getAllPendingParticipantResponse(state, action: PayloadAction<IParticipantsPayload>) {
      state.isLoadingGetAllPendingParticipant = false;
      state.pendingParticipants = action.payload.error ? state.pendingParticipants : action.payload.list;
      state.errorPendingParticipants = action.payload.error ? action.payload.error : null;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAllOfferSentParticipantRequest(state, action: PayloadAction<{ jobId: number }>) {
      state.isLoadingGetAllOfferSentPartcipant = true;
    },
    getAllOfferSentParticipantResponse(state, action: PayloadAction<IParticipantsPayload>) {
      state.isLoadingGetAllOfferSentPartcipant = false;
      state.offerSentParticipants = action.payload.error ? state.offerSentParticipants : action.payload.list;
      state.errorOfferSentParticipants = action.payload.error ? action.payload.error : null;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAllAcceptedParticipantRequest(state, action: PayloadAction<{ jobId: number }>) {
      state.isLoadingGetAllAcceptedPartcipant = true;
    },
    getAllAcceptedParticipantResponse(state, action: PayloadAction<IParticipantsPayload>) {
      state.isLoadingGetAllAcceptedPartcipant = false;
      state.acceptedParticipants = action.payload.error ? state.acceptedParticipants : action.payload.list;
      state.errorAcceptedParticipants = action.payload.error ? action.payload.error : null;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAllRejectedParticipantRequest(state, action: PayloadAction<{ jobId: number }>) {
      state.isLoadingGetAllRejectedPartcipant = true;
    },
    getAllRejectedParticipantResponse(state, action: PayloadAction<IParticipantsPayload>) {
      state.isLoadingGetAllRejectedPartcipant = false;
      state.rejectedParticipants = action.payload.error ? state.rejectedParticipants : action.payload.list;
      state.errorRejectedParticipants = action.payload.error ? action.payload.error : null;
    },
  },
});

export const participantListingActions = participantsListingSlice.actions;
export const participantListingReducers = participantsListingSlice.reducer;
