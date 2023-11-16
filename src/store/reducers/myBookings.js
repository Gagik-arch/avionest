import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    data: null,
}

export const myBookingsSlice = createSlice({
    name: 'myBookings',
    initialState: initialState,
    reducers: {
        setBookings(state, action) {
            state.data = action.payload
        },
        setLoading(state, action) {
            state.isLoading = action.payload
        },
    },
})

export const myBookingsActions = myBookingsSlice.actions;
export const myBookingsReducer = myBookingsSlice.reducer

