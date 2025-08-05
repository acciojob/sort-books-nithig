import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./BookSlice";
export default configureStore({
    reducer:{
        books:booksReducer
    }
})