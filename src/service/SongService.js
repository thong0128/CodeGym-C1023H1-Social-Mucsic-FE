import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {useState} from "react";


const songsId1 = {}
export const findSongById = createAsyncThunk(
    'songs/findSongById',
    async (id) => {
        const res = await songsId1;
        // const res = await axios.get('http://localhost:8080/songs/' + id);
        return res.data
    }
)
const songs1 = {}
export const findAllSong = createAsyncThunk(
    'songs/findAllSong',
    async () => {
        // const res = await axios.get('http://localhost:8080/songs');
        const res = await songs1 ;
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