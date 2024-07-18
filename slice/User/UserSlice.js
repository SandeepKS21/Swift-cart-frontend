import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addNewAddressApi,
  getUserAddressByIdApi,
  getUserDetailsApi,
  updateUserAddressByIdIdApi,
} from "./UserApi";
import { getCartItem } from "../Cart/CartSlice";

const initialState = {
  user: {},
  error: null,
  address: null,
  loading: false,
  isAddressUpdated: false,
  recentSearch: [],
};

export const getUserDetails = createAsyncThunk("getUserDetails", async () => {
  try {
    const response = await getUserDetailsApi();
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const getUserAddressById = createAsyncThunk(
  "getUserAddressById",
  async (id) => {
    try {
      const response = await getUserAddressByIdApi(id);
      return response;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const updateUserAddressById = createAsyncThunk(
  "updateUserAddressById",
  async ({ id, address }, { dispatch }) => {
    try {
      const response = await updateUserAddressByIdIdApi(id, address);
      await dispatch(getUserDetails());
      return response;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const addNewAddress = createAsyncThunk(
  "addNewAddress",
  async (address) => {
    try {
      const response = await addNewAddressApi(address);
      return response;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const getAddressDetailsWithCartCount = createAsyncThunk(
  "getAddressDetailsWithCartCount",
  async (_, { dispatch }) => {
    try {
      const response = await dispatch(getUserDetails());
      await dispatch(getCartItem());
      return response.payload;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.address = null;
      state.error = null;
      state.isAddressUpdated = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAddressDetailsWithCartCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAddressDetailsWithCartCount.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.error = null;
        state.loading = false;
      })
      .addCase(getAddressDetailsWithCartCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(getUserAddressById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAddressById.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload.data;
        state.error = null;
      })
      .addCase(getUserAddressById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(updateUserAddressById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAddressById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isAddressUpdated = true;
      })
      .addCase(updateUserAddressById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(addNewAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.error = null;
        state.isAddressUpdated = true;
        state.loading = false;
      })
      .addCase(addNewAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload.data;
        state.recentSearch = action.payload.data.recentSearch;
        state.loading = false;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function

export const userData = (state) => state.user.user;
export const userSliceLoading = (state) => state.user.loading;
export const address = (state) => state.user.address;
export const isAddressUpdated = (state) => state.user.isAddressUpdated;
export const userRecentSearch = (state) => state.user.recentSearch;

export const { resetUserState } = userSlice.actions;

export default userSlice.reducer;
