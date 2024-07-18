import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCategoryAsync } from "./categoryApi";

const initialState = {
  category: [],
  error: null,
  categoryLoading: "idle",
};

export const getAllCategory = createAsyncThunk("getAllCategory", async () => {
  try {
    const response = await getAllCategoryAsync();
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetState: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllCategory.pending, (state) => {
        state.categoryLoading = "pending";
        state.error = null;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.category = action.payload.data;
        state.error = null;
        state.categoryLoading = "idle";
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.categoryLoading = "idle";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function

export const categoryData = (state) => state.category.category;
export const error = (state) => state.category.error;
export const categoryLoading = (state) => state.category.categoryLoading;

// export const { resetState } = authSlice.actions;

export default categorySlice.reducer;
