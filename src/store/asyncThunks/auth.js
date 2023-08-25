import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";
import { authActions } from "../reducers";
import Toast from "react-native-toast-message";
import { Storage } from "../../resources";
import projectApi from "../../api/projectApi";

export const login = createAsyncThunk(
  "auth/login",
  async ({ body, navigation }, { dispatch }) => {
    dispatch(authActions.setLoading(true));
    authApi
      .login(body)
      .then(res => {
        dispatch(authActions.setUserData(res.data));
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
        Storage.setItem("token", res.data.access_token);
        Storage.setItem("user", JSON.stringify(res.data.user));
      })
      .catch(e => {
        Toast.show({
          type: "error",
          text1: e?.response?.data?.message || "An error occurred.",
        });
      })
      .then(() => {
        dispatch(authActions.setLoading(false));
      });
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async ({ navigation }, { dispatch }) => {
    dispatch(authActions.setLoading(true));

    authApi
      .logout()
      .then(() => {
        dispatch(authActions.setUserData(null));
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
        Storage.clearStorage();
      })
      .catch(e => {
        Toast.show({
          type: "error",
          text1: e?.response?.data?.message || "An error occurred.",
        });
      })
      .then(() => {
        dispatch(authActions.setLoading(false));
      });
  },
);
