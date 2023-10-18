import {createAsyncThunk} from "@reduxjs/toolkit";
import {cardsActions} from "../reducers";
import Toast from "react-native-toast-message";
import usersApi from "../../api/usersApi";

export const getCards = createAsyncThunk(
    "cards/getAll",
    async (_, {dispatch}) => {
        dispatch(cardsActions.setLoading(true));
        usersApi.getCards()
            .then(res => {
                dispatch(cardsActions.setData(res.data.cards.data));
            })
            .catch(e => {
                Toast.show({
                    type: 'error',
                    text1: `${e} <usersApi.getCards>`,
                });
            })
            .then(() => {
                dispatch(cardsActions.setLoading(false));
            })
    },
);
export const deleteCard = createAsyncThunk(
    "cards/delete",
    async ({cardId}, {dispatch}) => {
        dispatch(cardsActions.setLoading(true));
        usersApi.deleteCard({cardId})
            .then(() => {
                dispatch(cardsActions.removeCard(cardId));
            })
            .catch(e => {
                console.log(e)
                Toast.show({
                    type: 'error',
                    text1: `${e} <usersApi.deleteCard>`,
                });
            })
            .then(() => {
                dispatch(cardsActions.setLoading(false));
            })
    },
);
