import { createSlice } from '@reduxjs/toolkit'

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        userId: null
    },
    reducers: {
        getUser(state, action) {
            state.user = action.payload
        },
        clearUser(state) {
            state.user = null
        },
        getId(state, action) {
            state.userId = action.payload
        },
        clearId(state) {
            state.userId = null
        }
    }
})

export const UserActions = UserSlice.actions
export default UserSlice