import {createAsyncThunk} from "@reduxjs/toolkit";
import authApi from "../../api/authApi";
import {authActions} from "../reducers";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = createAsyncThunk(
    "auth/login",
    async ({body, navigation}, {dispatch}) => {
        dispatch(authActions.setLoading(true));

        authApi
            .login(body)
            .then(res => {
                Promise.all([
                    AsyncStorage.setItem('token', JSON.stringify(res.data.tokens)),
                    AsyncStorage.setItem('user', JSON.stringify(res.data))
                ])
                    .then(() => {
                        dispatch(authActions.setUserData(res.data));
                        navigation.reset({
                            index: 0,
                            routes: [{name: "Home"}],
                        });
                    })
                    .catch(e => {
                        Toast.show({
                            type: 'error',
                            text1: `${e} <Signin>`,
                        });
                    })
                    .then(() => {
                        dispatch(authActions.setLoading(false));
                    })
            })
            .catch(e => {
                Toast.show({
                    type: 'error',
                    text1: `${e} <Signin>`,
                });
            })
            .then(() => {
                dispatch(authActions.setLoading(false));
            });
    },
);
export const updateUser = createAsyncThunk(
    "auth/update",
    async ({body, navigation}, {dispatch}) => {
        dispatch(authActions.setLoading(true));

        authApi
            .updateUser(body)
            .then(async () => {
                let prevUser = await AsyncStorage.getItem('user')
                if (prevUser) {
                    prevUser = JSON.parse(prevUser)
                    prevUser.user = body
                    Promise.all([
                        AsyncStorage.setItem('user', JSON.stringify(prevUser))
                    ])
                        .then(() => {
                            dispatch(authActions.setUpdateUser(body));
                            navigation.reset({
                                index: 0,
                                routes: [{name: "Home"}],
                            });
                        })
                        .catch(e => {
                            Toast.show({
                                type: 'error',
                                text1: `${e} <Signin>`,
                            });
                        })
                        .then(() => {
                            dispatch(authActions.setLoading(false));
                            setIsLoading(false)
                        })
                }
            })
            .catch(e => {
                console.log(e)
                Toast.show({
                    type: 'error',
                    text1: `${e} <Update user>`,
                });
            })
            .then(() => {
                dispatch(authActions.setLoading(false));
            });
    },
);
export const logout = createAsyncThunk(
    "auth/logout",
    async ({navigation}, {dispatch}) => {
        dispatch(authActions.setLoading(true));

        authApi
            .logout()
            .then(() => {
                dispatch(authActions.setUserData(null));
                navigation.reset({
                    index: 0,
                    routes: [{name: "Login"}],
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
