import {createSlice} from "@reduxjs/toolkit";

const codeSlice = createSlice({
    name: "codes",
    initialState: [],
    reducers: {
        addCode: (state, action) => {
            state.push(action.payload);
            return state;
        },
        deleteCode: (state, action) => {
            state.push(action.payload);
        }
    }
})

export const { addCode, deleteCode } = codeSlice.actions;

export default codeSlice.reducer