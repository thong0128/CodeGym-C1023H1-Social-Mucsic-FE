import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = axios.get("http://localhost:8080/users")

export const findUserById = createAsyncThunk(
    'user/findUserById',
    async (id) => {
        const res = await axios.get('http://localhost:8080/user/' + id);
        return res.data
    }
)
export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (user) => {
        const res = await axios.put("http://localhost:8080/user", user);
        return res.data
    }
)