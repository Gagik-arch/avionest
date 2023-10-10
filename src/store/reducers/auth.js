import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    data: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setUserData(state, action) {
            state.data = action.payload
        },
        setLoading(state, action) {
            state.isLoading = action.payload
        },
        setUpdateUser(state, action) {
            state.data.user = action.payload
        },
    },
})

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer

