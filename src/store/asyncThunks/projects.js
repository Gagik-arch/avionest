import { createAsyncThunk } from "@reduxjs/toolkit";
import { projectsActions } from "../reducers";
import Toast from "react-native-toast-message";
import projectApi from "../../api/projectApi";

export const getAllProjects = createAsyncThunk(
  "user/projects",
  async ({ page  }, { dispatch }) => {
    dispatch(projectsActions.setLoading(true));

    projectApi
      .getAllProjects(page)
      .then(res => {
        dispatch(projectsActions.setData(res.data));
      })
      .catch(e => {
          Toast.show({
            type: "error",
            text1: e?.response?.data?.message || "getAllProjects An error occurred.",
          });
      })
      .then(() => {
        dispatch(projectsActions.setLoading(false));
      });
  },
);

export const addProject = createAsyncThunk(
  "user/projects/add",
  async ({ body, navigation, sheetRef, setBody }, { dispatch }) => {
    dispatch(projectsActions.setLoading(true));

    projectApi
      .createProject(body)
      .then(res => {
        dispatch(projectsActions.setProject(res.data.data));
        navigation.navigate("My Projects");
        setBody({});

      })
      .catch(e => {
        Toast.show({
          type: "error",
          text1: e?.response?.data?.message || "An error occurred.",
        });
      })
      .then(() => {
        dispatch(projectsActions.setLoading(false));
        sheetRef.current.close();
      });
  },
);
export const deleteProject = createAsyncThunk(
  "user/projects/delete",
  async ({ id, setIsLoading }, { dispatch, getState }) => {
    // dispatch(projectsActions.setLoading(true));
    const state = getState();
    setIsLoading(true);
    projectApi
      .deleteProject(id)
      .then(() => {
        dispatch(projectsActions.setDeleteProject(state.projects.data.filter(i => i.id !== id)));
      })
      .catch(e => {
        Toast.show({
          type: "error",
          text1: e?.response?.data?.message || "An error occurred.",
        });
      })
      .then(() => {
        setIsLoading(false);
        // dispatch(projectsActions.setLoading(false));
      });
  },
);
