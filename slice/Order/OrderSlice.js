import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrderByIdApi, getOrderListApi } from "./OrderApi";

const initialState = {
  orderList: {
    activeOrder: [],
    pastOrder: [],
  },
  order: null,
  loading: {
    getOrderList: false,
    getOrderById: false,
  },
  error: null,
};

export const getOrderList = createAsyncThunk("getOrderList", async () => {
  try {
    const response = await getOrderListApi();
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const getOrderById = createAsyncThunk("getOrderById", async (id) => {
  try {
    const response = await getOrderByIdApi(id);
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getOrderList.pending, (state) => {
        state.loading.getOrderList = true;
        state.error = null;
      })
      .addCase(getOrderList.fulfilled, (state, action) => {
        state.loading.getOrderList = false;
        state.orderList = action.payload.data;
        state.error = null;
      })
      .addCase(getOrderList.rejected, (state, action) => {
        state.loading.getOrderList = false;
        state.error = action.error.message;
      });

    builder
      .addCase(getOrderById.pending, (state) => {
        state.loading.getOrderById = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading.getOrderById = false;
        state.order = action.payload.data;
        state.error = null;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading.getOrderById = false;
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function

export const orderList = (state) => state.order.orderList;
export const order = (state) => state.order.order;
export const error = (state) => state.order.error;
export const loading = (state) => state.order.loading;

export const { resetState } = OrderSlice.actions;

export default OrderSlice.reducer;
