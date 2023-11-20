import {createAsyncThunk} from "@reduxjs/toolkit";
import { myBookingsActions} from "../reducers";
import Toast from "react-native-toast-message";
import usersApi from "../../api/usersApi";
import airfieldsApi from "../../api/airfieldsApi";

export const getMyBookings = createAsyncThunk(
    "myBookings/getAll",
    async (_, {dispatch}) => {
        dispatch(myBookingsActions.setLoading(true));
        usersApi.getIntents()
            .then(res => {
                console.log(res.data)
                dispatch(myBookingsActions.addBookings(res.data.stripeIntents));
            })
            .catch(e => {
                console.log(e)
                Toast.show({
                    type: 'error',
                    text1: `${e} <usersApi.getIntents>`,
                });
            })
            .then(() => {
                dispatch(myBookingsActions.setLoading(false));
            })
    },
);

export const addMyBooking = createAsyncThunk(
    "myBookings/add",
    async ({setSuccessResponse,body}, {dispatch}) => {
        dispatch(myBookingsActions.setLoading(true));
        airfieldsApi.bookAirfield(body)
            .then(res => {
                setSuccessResponse(true)
                dispatch(myBookingsActions.addBooking(res.data.stripeIntents));
            })
            .catch(e => {
                console.log(e)
                Toast.show({
                    type: 'error',
                    text1: `${e} <usersApi.addMyBooking>`,
                });
            })
            .then(() => {
                dispatch(myBookingsActions.setLoading(false));
            })
    },
);
