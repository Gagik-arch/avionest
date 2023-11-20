import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    data: [],
}

export const myBookingsSlice = createSlice({
    name: 'myBookings',
    initialState: initialState,
    reducers: {
        addBookings(state, action) {
            state.data = action.payload
        },
        setLoading(state, action) {
            state.isLoading = action.payload
        },
        addBooking(state,action){
            state.data.unshift(action.payload)
        }
    },
})

export const myBookingsActions = myBookingsSlice.actions;
export const myBookingsReducer = myBookingsSlice.reducer

