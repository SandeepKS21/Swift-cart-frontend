import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authSendOtpApi, authVerifyOtpApi } from "./AuthApi";
import { readItem, saveItem } from "../utils/localStorage";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  message: "",
  // isSucess: false,
};

export const authSendOtp = createAsyncThunk(
  "user/sendOtp",
  async (userBody) => {
    try {
      const response = await authSendOtpApi(userBody);
      return response;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const authVerifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async (userBody, { rejectWithValue }) => {
    try {
      const response = await authVerifyOtpApi(userBody);
      await saveItem("user", JSON.stringify(response.data));
      await saveItem("token", JSON.stringify(response.accessToken));

      return response;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    resetState: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(authSendOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authSendOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(authSendOtp.rejected, (state, action) => {
        state.isLoading = false;

        state.status = "error";
        state.error = action.error.message;
      });

    builder
      .addCase(authVerifyOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authVerifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.token = action.payload.accessToken;
        state.message = action.payload.message;
      })
      .addCase(authVerifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function

export const userDetails = (state) => state.userAuth.user;
export const token = (state) => state.userAuth.token;
export const isLoading = (state) => state.userAuth.isLoading;
export const authError = (state) => state.userAuth.error;
export const responseMessage = (state) => state.userAuth.message;

export const { resetState } = authSlice.actions;

export default authSlice.reducer;
