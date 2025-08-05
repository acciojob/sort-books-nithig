import { createSlice } from "@reduxjs/toolkit";
export const BookSlice=createSlice({
    name:'books',
    initialState:{
        items:[]
    },
    reducers:{
        setBooks(state,action){
            state.items=action.payload
        }
    }
})
export const {setBooks}=BookSlice.actions
export default BookSlice.reducer;