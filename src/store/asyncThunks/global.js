import {createAsyncThunk} from "@reduxjs/toolkit";
import {globalActions} from "../reducers";
import Toast from "react-native-toast-message";
import globalApi from "../../api/globalApi";

export const getAuthSources = createAsyncThunk(
    "countries",
    async (_, {dispatch}) => {
        dispatch(globalActions.setLoading(true));
        globalApi.getAuthSources()
            .then(res => {
                dispatch(globalActions.setAuthSources(res.data));
            })
            .catch(e => {
                Toast.show({
                    type: "error",
                    text1: e?.response?.data?.message || "getAllProjects An error occurred.",
                });
            })
            .then(() => {
                dispatch(globalActions.setLoading(false));
            })
    },
);

export const getCards = createAsyncThunk(
    "countries",
    async (_, {dispatch}) => {
        dispatch(globalActions.setLoading(true));
        globalApi.getAuthSources()
            .then(res => {
                dispatch(globalActions.setAuthSources(res.data));
            })
            .catch(e => {
                Toast.show({
                    type: "error",
                    text1: e?.response?.data?.message || "getAllProjects An error occurred.",
                });
            })
            .then(() => {
                dispatch(globalActions.setLoading(false));
            })
    },
);
