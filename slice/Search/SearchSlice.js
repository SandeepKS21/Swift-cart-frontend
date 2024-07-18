import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchProductApi } from "./SearchApi";

const initialState = {
  searchData: [],
  loading: false,
  error: null,
};

export const searchProduct = createAsyncThunk(
  "searchProduct",
  async (searchBody) => {
    try {
      const response = await searchProductApi(searchBody);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.searchData=[];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.searchData = action.payload.data;
        state.error = null;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function

export const searchData = (state) => state.search.searchData;
export const error = (state) => state.search.error;
export const loading = (state) => state.search.loading;

export const { resetState } = SearchSlice.actions;

export default SearchSlice.reducer;
