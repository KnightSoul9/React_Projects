//this is the assignment because we will store the post in the state  
import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    //here we will maintiain the intial state of the post 
}

const postSlice = createSlice({
    name: "post",
    intialState,
    reducers: {
        addPost:(state,action)=>{
            state.post = action.payload;
        }
    }
})

export const {addPost} = postSlice.actions;
export default postSlice.actions