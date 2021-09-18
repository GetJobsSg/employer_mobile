import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonTypes } from 'src/shared';
import { participantsListingInitialState } from './defaultState';
import { IOfferJobPayload, IParticipantsPayload, IRejectPayload } from './types';

const participantsListingSlice = createSlice({
  name: 'participantListing',
  initialState: participantsListingInitialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAllPendingParticipantRequest(state, action: PayloadAction<CommonTypes.ICommonJobRequest>) {
      state.isLoadingGetAllPendingParticipant = true;
    },
    getAllPendingParticipantResponse(state, action: PayloadAction<IParticipantsPayload>) {
      state.isLoadingGetAllPendingParticipant = false;
      state.pendingParticipants = action.payload.error ? state.pendingParticipants : action.payload.list;
      state.errorPendingParticipants = action.payload.error ? action.payload.error : null;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAllOfferSentParticipantRequest(state, action: PayloadAction<CommonTypes.ICommonJobRequest>) {
      state.isLoadingGetAllOfferSentPartcipant = true;
    },
    getAllOfferSentParticipantResponse(state, action: PayloadAction<IParticipantsPayload>) {
      state.isLoadingGetAllOfferSentPartcipant = false;
      state.offerSentParticipants = action.payload.error ? state.offerSentParticipants : action.payload.list;
      state.errorOfferSentParticipants = action.payload.error ? action.payload.error : null;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAllAcceptedParticipantRequest(state, action: PayloadAction<CommonTypes.ICommonJobRequest>) {
      state.isLoadingGetAllAcceptedPartcipant = true;
    },
    getAllAcceptedParticipantResponse(state, action: PayloadAction<IParticipantsPayload>) {
      state.isLoadingGetAllAcceptedPartcipant = false;
      state.acceptedParticipants = action.payload.error ? state.acceptedParticipants : action.payload.list;
      state.errorAcceptedParticipants = action.payload.error ? action.payload.error : null;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAllRejectedParticipantRequest(state, action: PayloadAction<CommonTypes.ICommonJobRequest>) {
      state.isLoadingGetAllRejectedPartcipant = true;
    },
    getAllRejectedParticipantResponse(state, action: PayloadAction<IParticipantsPayload>) {
      state.isLoadingGetAllRejectedPartcipant = false;
      state.rejectedParticipants = action.payload.error ? state.rejectedParticipants : action.payload.list;
      state.errorRejectedParticipants = action.payload.error ? action.payload.error : null;
    },

    sendOfferParticipantRequest(state, action: PayloadAction<IOfferJobPayload>) {
      const { jobseekerId } = action.payload;
      state.pendingParticipants = state.pendingParticipants.map((p) => {
        if (p.jobseekerId === jobseekerId) return { ...p, isSendingOffer: true };
        return p;
      });
    },
    sendOfferParticipantResponse(state, action: PayloadAction<{ jobseekerId: number; error: null | any }>) {
      const { jobseekerId, error } = action.payload;
      // no error - successfully sent offer, remove the participants from the list
      if (!error) {
        state.pendingParticipants = state.pendingParticipants.filter((p) => p.jobseekerId !== jobseekerId);
        return;
      }

      // has error - reset isSendingOffer to false
      state.pendingParticipants = state.pendingParticipants.map((p) => {
        if (p.jobseekerId === jobseekerId && error) return { ...p, isSendingOffer: false };
        return p;
      });
    },

    rejectOfferParticipantRequest(state, action: PayloadAction<IRejectPayload>) {
      const { jobseekerId } = action.payload;
      state.pendingParticipants = state.pendingParticipants.map((p) => {
        if (p.jobseekerId === jobseekerId) return { ...p, isRejecting: true };
        return p;
      });
    },

    rejectOfferParticipantResponse(state, action: PayloadAction<{ jobseekerId: number; error: null | any }>) {
      const { jobseekerId, error } = action.payload;
      // no error - successfully reject participant, remove the participats from the list
      if (!error) {
        state.pendingParticipants = state.pendingParticipants.filter((p) => p.jobseekerId !== jobseekerId);
      }
      // has error = set isRejecting to false
      state.pendingParticipants = state.pendingParticipants.map((p) => {
        if (p.jobseekerId === jobseekerId && error) return { ...p, isRejecting: false };
        return p;
      });
    },
  },
});

export const participantListingActions = participantsListingSlice.actions;
export const participantListingReducers = participantsListingSlice.reducer;
