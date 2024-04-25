
import {createSlice} from "@reduxjs/toolkit";
import {findUserById, updateUser} from "../../service/UserService";
import {toast} from "react-toastify";
const initialState = {
    user: {}
}
const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{},
    extraReducers: builder =>{
        builder.addCase(findUserById.fulfilled, (state, action) => {
            state.user = action.payload;
        })
        builder.addCase(updateUser.fulfilled,(state, action)=>{
            toast.success("Update thành công", {})
        })
    }
})
export default userSlice.reducer;