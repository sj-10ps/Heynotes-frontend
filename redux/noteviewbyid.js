import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import IP from "../IP"


export const viewnotebyid=createAsyncThunk(
    "viewnotebyid/viewnotebyid",
    async(id)=>{
    const res=await axios.get(`${IP}/viewbyid/${id}`)
    return res.data
    }
)

const viewnotebyidslice=createSlice({
    name:'viewnotebyid',
    initialState:{
        loading:false,
        success:false,
        data:{}
   
    },
    extraReducers:(builder)=>{
        builder
        .addCase(viewnotebyid.pending,(state)=>{
            state.loading=true
            state.success=false
        })
        .addCase(viewnotebyid.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.data=action.payload.data
        })
    }
})

const viewnotebyidreducer=viewnotebyidslice.reducer
export default viewnotebyidreducer