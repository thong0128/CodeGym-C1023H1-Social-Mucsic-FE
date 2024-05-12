import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

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
        return res.data
    }
)

export const newSongsList = createAsyncThunk(
    'songs/newSongsList',
    async () => {
        const res = await axios.get('http://localhost:8080/songs/newSongsList');
        return res.data
    }
)

export const hotSongsList = createAsyncThunk(
    'songs/hotSongsList',
    async () => {
        const res = await axios.get('http://localhost:8080/songs/hotSongsList');
        return res.data
    }
)

export const favoriteSongs = createAsyncThunk(
    'songs/favoriteSongs',
    async () => {
        const res = await axios.get('http://localhost:8080/songs/favoriteSongs');
        return res.data
    }
)

export const findSongBySinger = createAsyncThunk(
    'songs/findSongBySinger',
    async (singer) =>{
        const res = await axios.get("http://localhost:8080/songs/findSongBySinger/" + singer);
        return res.data
    }
)

export const findSongByTitle = createAsyncThunk(
    'songs/findSongByTitle',
    async (title) => {
        const res = await axios.get("http://localhost:8080/songs/findSongByTitle/" + title);
        return res.data
    }
)

export const findSongByAuthor = createAsyncThunk(
    'songs/findSongByAuthor',
    async (author) =>{
        const res = await axios.get("http://localhost:8080/songs/findSongByAuthor/" + author);
        return res.data
    }
)

export const findPlaylistByTitle = createAsyncThunk(
    'playlist/findByTitle',
    async (title) => {
        const res = await axios.get("http://localhost:8080/playlist/findByTitle/" + title);
        return res.data
    }
)

export const getSongByPll = createAsyncThunk(
    'playlist/song',
    async (idPll) => {
        const res = await axios.get("http://localhost:8080/playlist/song/" + idPll);
        return res.data
    }
)