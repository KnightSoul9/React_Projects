//this auth slice will verify that the user is authenticated or not 
import { createSlice  } from "@reduxjs/toolkit";

const initialState = {
    status: false,//intially we are assuming that the user is not logged in
    userData: null,
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login:(state,action)=>{
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout:(state,action)=>{
            state.status = false;
            state.userData = null;
        }
    }
})
export const { login, logout } = authSlice.actions;
export default authSlice.reducer
