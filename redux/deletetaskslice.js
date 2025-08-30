import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import IP from "../IP"


export const deletetask=createAsyncThunk(
    "deletetask/deletetask",
    async(id)=>{
    const res=await axios.post(`${IP}/deletetask`,{id})
    return res.data
    }
)

const deletetaskslice=createSlice({
    name:'deletetask',
    initialState:{
        loading:false,
        success:false,
   
    },
    extraReducers:(builder)=>{
        builder
        .addCase(deletetask.pending,(state)=>{
            state.loading=true
            state.success=false
        })
        .addCase(deletetask.fulfilled,(state,action)=>{
            state.loading=false
            state.success=action.payload.status==="ok"
        })
    }
})

const deletetaskreducer=deletetaskslice.reducer
export default deletetaskreducer