import { createSlice } from "@reduxjs/toolkit";
import { getLanguages } from "../actions";

const initialState = {
  isLoading: false,
  isError: false,
  languages: [],
};

const languageSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getLanguages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLanguages.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message;
    });
    builder.addCase(getLanguages.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.languages = action.payload;
      // console.log(action.payload);
    });
  },
});

export default languageSlice.reducer;
