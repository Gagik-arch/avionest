import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
};

export const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setAuthSources(state, action) {
      state.data = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const globalActions = globalSlice.actions;
export const globalReducer = globalSlice.reducer;

