import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    data: [],
    defaultCardId: undefined
};

export const cardsSlice = createSlice({
    name: "cards",
    initialState: initialState,
    reducers: {
        setData(state, action) {
            state.data = action.payload;
        },
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        addCard(state, action) {
            state.data.push(action.payload)
        },
        removeCard(state, action) {
            const cloneData = [...state.data]
            state.data = cloneData.filter(e => e.id !== action.payload)
        },
        setDefaultCard(state, action) {
            state.defaultCardId = action.payload
        },
    },
});

export const cardsActions = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;

