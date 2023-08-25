import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
  body: {},
  pages: {},
};

export const projectsSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload.data;
      const page = action.payload.links?.next?.split("=")?.pop();

      const links = {};
      Object.entries(action.payload.links)
        .forEach(([key, value]) => links[key] = value ? +value.split("=")?.pop() : null);

      if (page) state.nextPage = +page;

      state.pages = links;
    },
    setProject(state, action) {
      state.data = [action.payload,...state.data];
    },
    setDeleteProject(state, action) {
      state.data = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setBody(state, action) {
      state.body = action.payload;
    },
  },
});

export const projectsActions = projectsSlice.actions;
export const projectsReducer = projectsSlice.reducer;

