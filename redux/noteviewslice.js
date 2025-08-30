import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import IP from "../IP"


export const viewnote=createAsyncThunk(
    "viewnote/viewnote",
    async()=>{
    const res=await axios.get(`${IP}/viewall`)
    return res.data
    }
)

const viewnoteslice=createSlice({
    name:'viewnote',
    initialState:{
        loading:false,
        success:false,
        data:[]
   
    },
    extraReducers:(builder)=>{
        builder
        .addCase(viewnote.pending,(state)=>{
            state.loading=true
            state.success=false
        })
        .addCase(viewnote.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.data=action.payload.data
        })
    }
})

const viewnotereducer=viewnoteslice.reducer
export default viewnotereducer