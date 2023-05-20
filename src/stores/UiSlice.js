import { createSlice } from '@reduxjs/toolkit'

const UiSlice = createSlice({
    name: 'ui',
    initialState: {
        message: false
    },
    reducers: {
        getMessage(state, action){
            state.message = true
        },
        clearMessage(state){
            state.message = false
        }
    }
})

export const UiActions = UiSlice.actions
export default UiSlice