import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPaymentLinkApi } from "./PaymentApi";

const initialState = {
  paymentLink: null,
  loading: false,
  error: null,
};

export const getPaymentLink = createAsyncThunk("getPaymentLink", async (paymentBody) => {
  try {
    const response = await getPaymentLinkApi(paymentBody);
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const PaymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPaymentLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentLink.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentLink = action.payload.data.url;
        state.error = null;
      })
      .addCase(getPaymentLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function

export const paymentLink = (state) => state.payment.paymentLink;
export const error = (state) => state.payment.error;
export const loading = (state) => state.payment.loading;

export const { resetState } = PaymentSlice.actions;

export default PaymentSlice.reducer;
