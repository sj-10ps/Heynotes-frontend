import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import IP from "../IP"


export const updatenote=createAsyncThunk(
    "updatenote/updatenote",
    async(formdata)=>{
    const res=await axios.post(`${IP}/updatenote`,formdata,{headers:{'Content-Type':'multipart/form-data'}})
    return res.data
    }
)

const updatenoteslice=createSlice({
    name:'updatenote',
    initialState:{
        loading:false,
        success:false,
       
   
    },
    extraReducers:(builder)=>{
        builder
        .addCase(updatenote.pending,(state)=>{
            state.loading=true
            state.success=false
        })
        .addCase(updatenote.fulfilled,(state,action)=>{
            state.loading=false
            state.success=action.payload.status==="ok"
        })
    }
})

const updatenotereducer=updatenoteslice.reducer
export default updatenotereducer