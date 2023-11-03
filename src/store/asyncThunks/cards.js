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
                dispatch(cardsActions.setDefaultCard(res.data.defaultCardId));
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
    async ({cardId,setIsLoading}, {dispatch}) => {
        setIsLoading(true);
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
                setIsLoading(false);
            })
    },
);
export const addCard = createAsyncThunk(
    "cards/add",
    async ({card, navigation}, {dispatch}) => {

        dispatch(cardsActions.setLoading(true));
        usersApi.addCard({
            stripe_card_token: card.id,
            stripe_card_id: card.card.id,
        })
            .then((res) => {
                dispatch(cardsActions.addCard(card));
            })
            .catch(e => {
                console.log(e)
                Toast.show({
                    type: 'error',
                    text1: `${e} <usersApi.addCard>`,
                });
            })
            .then(() => {
                dispatch(cardsActions.setLoading(false));
                navigation.reset({index: 0, routes: [{name: "Payments"}]});
            })
    },
);
