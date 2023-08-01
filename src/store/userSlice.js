import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    _id:"",
    email:"",
    username:"",
    auth:false,
    seller:false

}

export const userSlice = createSlice({
    name:'user',
    initialState ,
    reducers:{
        setUser:(state,action)=>{
             const {_id,email,username,auth,seller}=action.payload
             state._id=_id
             state.email=email
             state.username=username
             state.auth=auth
             state.seller=seller

        },
        resetUser:(state,action)=>{
            
            state._id='';
            state.email='';
            state.username='';
            state.auth=false;
            state.seller=false;
        }
    }
})

export const  {setUser,resetUser}= userSlice.actions

export default userSlice.reducer