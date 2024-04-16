import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {useState} from "react";

export const findSongById = createAsyncThunk(
    'songs/findSongById',
    async (id) => {
        const res = await axios.get('http://localhost:8080/songs/' + id);
        return res.data
    }
)
export const findAllSong = createAsyncThunk(
    'songs/findAllSong',
    async () => {
        const res = await axios.get('http://localhost:8080/songs');
        console.log("data 5: ", res.data)
        return res.data
    }
)
export const findAllByNameSinger = createAsyncThunk(
    'songs/findAllByNameSinger',
    async (nameSinger) =>{
        const res = await axios.get('http://localhost:8080/songs/findAllByNameSinger/' + nameSinger);
        return res.data
    }
)

export const searchByName = createAsyncThunk(
    'songs/searchByName',
    async (nameSong) => {
        const res = await axios.get("http://localhost:8080/songs/searchByName/" + nameSong);
        return res.data
    }
)