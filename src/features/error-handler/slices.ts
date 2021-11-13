import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const errorHandlerSlice = createSlice({
  name: 'error',
  initialState: {
    isShow: false,
    message: '',
  },
  reducers: {
    showError(state, action: PayloadAction<{ message: string }>) {
      state.isShow = true;
      state.message = action.payload.message;
    },
    hideError(state) {
      state.isShow = false;
      state.message = '';
    },
  },
});

export const errorHandlerActions = errorHandlerSlice.actions;
export const errorHandlerReducers = errorHandlerSlice.reducer;
