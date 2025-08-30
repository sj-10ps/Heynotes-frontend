import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import IP from "../IP"


export const createnote=createAsyncThunk(
    "createnote/createnote",
    async(formdata)=>{
    const res=await axios.post(`${IP}/create`,formdata,{
       headers: { "Content-Type": "multipart/form-data" }
    })
    return res.data
    }
)

const createnoteslice=createSlice({
    name:'createnote',
    initialState:{
        loading:false,
        success:false,
   
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createnote.pending,(state)=>{
            state.loading=true
            state.success=false
        })
        .addCase(createnote.fulfilled,(state,action)=>{
            state.loading=false
            state.success=action.payload.status==="ok"
        })
    }
})

const createnotereducer=createnoteslice.reducer
export default createnotereducer