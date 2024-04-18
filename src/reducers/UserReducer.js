import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "users",
    initialState: [
        {
            id: 1,
            name: "Funwi Kelsea",
            email:"funwikelseandohnwi@gmail.com",
        }
    ],
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload);
        },
        deleteUser: (state, action) => {
            state = state.filter((item) => item.id !== action.payload.id);
        }
    }
})

export const {addUser} = userSlice.actions;
export default userSlice.reducer;