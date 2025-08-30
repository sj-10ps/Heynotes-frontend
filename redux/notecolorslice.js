import { createSlice } from "@reduxjs/toolkit";

const notecolorslice=createSlice({
    name:"notecolor",
    initialState:{
        backgroundColor: "#f9f9f9"
    },
    reducers:{
        reset:(state,action)=>{
             state.backgroundColor= "#f9f9f9"
        },
        setColor:(state,action)=>{
            state.backgroundColor=action.payload
        }
    }
})

const notecolorreducer=notecolorslice.reducer
export const {reset,setColor}=notecolorslice.actions
export default notecolorreducer