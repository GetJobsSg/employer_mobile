import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { JobApplicationStatus } from 'src/constants/status';
import { getAllParticipants, sendParticipantOffer, rejectParticipant } from './apis';
import { IParticipantListResponse } from './apis/types';
import { participantListingActions } from './slice';
import { IOfferJobPayload, IParticipant, IRejectPayload } from './slice/types';
import { participantsTransformer } from './transformer';

function* getAllPendingParticipantSaga(action: PayloadAction<{ jobId: number }>) {
  try {
    const { jobId } = action.payload;
    const res: IParticipantListResponse = yield call(getAllParticipants, jobId, JobApplicationStatus.PENDING);
    const transformed: IParticipant[] = participantsTransformer.toState(res.data);
    yield put(participantListingActions.getAllPendingParticipantResponse({ list: transformed, error: null }));
  } catch (e) {
    yield put(participantListingActions.getAllPendingParticipantResponse({ list: [], error: e }));
  }
}

function* getAllOfferSentParticipantSaga(action: PayloadAction<{ jobId: number }>) {
  try {
    const { jobId } = action.payload;
    const res: IParticipantListResponse = yield call(getAllParticipants, jobId, JobApplicationStatus.OFFERED);
    const transformed: IParticipant[] = participantsTransformer.toState(res.data);
    yield put(participantListingActions.getAllOfferSentParticipantResponse({ list: transformed, error: null }));
  } catch (e) {
    yield put(participantListingActions.getAllOfferSentParticipantResponse({ list: [], error: e }));
  }
}

function* getAllAcceptedParticipantSaga(action: PayloadAction<{ jobId: number }>) {
  try {
    const { jobId } = action.payload;
    const res: IParticipantListResponse = yield call(getAllParticipants, jobId, JobApplicationStatus.ACCEPTED);
    const transformed: IParticipant[] = participantsTransformer.toState(res.data);
    yield put(participantListingActions.getAllAcceptedParticipantResponse({ list: transformed, error: null }));
  } catch (e) {
    yield put(participantListingActions.getAllAcceptedParticipantResponse({ list: [], error: e }));
  }
}

function* getAllRejectedParticipantSaga(action: PayloadAction<{ jobId: number }>) {
  try {
    const { jobId } = action.payload;
    const res: IParticipantListResponse = yield call(getAllParticipants, jobId, JobApplicationStatus.REJECTED);
    const transformed: IParticipant[] = participantsTransformer.toState(res.data);
    yield put(participantListingActions.getAllRejectedParticipantResponse({ list: transformed, error: null }));
  } catch (e) {
    yield put(participantListingActions.getAllRejectedParticipantResponse({ list: [], error: e }));
  }
}

function* sendParticipantOfferSaga(action: PayloadAction<IOfferJobPayload>) {
  const { jobseekerId, jobId } = action.payload;
  try {
    yield call(sendParticipantOffer, { jobId, jobseekerId });
    yield put(participantListingActions.sendOfferParticipantResponse({ jobseekerId, error: null }));
  } catch (e) {
    yield put(participantListingActions.sendOfferParticipantResponse({ jobseekerId, error: e }));
  }
}

function* rejectParticipantSaga(action: PayloadAction<IRejectPayload>) {
  const { jobseekerId, jobId } = action.payload;
  try {
    yield call(rejectParticipant, { jobseekerId, jobId });
    yield put(participantListingActions.rejectOfferParticipantResponse());
  } catch (e) {
    yield put(participantListingActions.rejectOfferParticipantResponse());
  }
}

function* watchParticipantListingSaga() {
  yield takeLatest(participantListingActions.getAllPendingParticipantRequest, getAllPendingParticipantSaga);
  yield takeLatest(participantListingActions.getAllOfferSentParticipantRequest, getAllOfferSentParticipantSaga);
  yield takeLatest(participantListingActions.getAllAcceptedParticipantRequest, getAllAcceptedParticipantSaga);
  yield takeLatest(participantListingActions.getAllRejectedParticipantRequest, getAllRejectedParticipantSaga);

  yield takeEvery(participantListingActions.sendOfferParticipantRequest, sendParticipantOfferSaga);
  yield takeEvery(participantListingActions.rejectOfferParticipantRequest, rejectParticipantSaga);
}

const participantListingSaga = [fork(watchParticipantListingSaga)];

export default participantListingSaga;
