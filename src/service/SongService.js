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