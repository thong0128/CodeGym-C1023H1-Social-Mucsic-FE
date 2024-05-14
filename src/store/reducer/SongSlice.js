import {createSlice} from "@reduxjs/toolkit";
import {
    findSongBySinger,
    findAllSong,
    findSongById,
    newSongsList,
    findSongByTitle,
    findSongByAuthor,
    hotSongsList,
    favoriteSongs,
    getSongByPll,
    findPlaylistByTitle,
    // reverseNextSong,
    // transferNextSong
} from "../../service/SongService"
const initialState = {
    song: {},
    songs: [],
    songsLates: [],
    songHot: [],
    favoriteSongs:[],
    songsByTitle: [],
    songsBySinger: [],
    songsByAuthor: [],
    songPlaying: [],
    songsByPll:[],
    playlistByTitle:[]
}
const songSlice = createSlice({
    name:'songs',
    initialState,
    reducers:{},
    extraReducers: builder =>{

        builder.addCase(findSongById.fulfilled, (state, action) => {
            state.song = action.payload;
        })
        builder.addCase(findAllSong.fulfilled, (state, action)=>{
            state.songs = action.payload
        })
        builder.addCase(newSongsList.fulfilled, (state, action)=>{
            state.songsLates = action.payload
        })
        builder.addCase(hotSongsList.fulfilled, (state, action)=>{
            state.songHot = action.payload
        })

        builder.addCase(favoriteSongs.fulfilled, (state, action)=>{
            state.favoriteSongs = action.payload
        })
        builder.addCase(findSongByTitle.fulfilled, (state, action) => {
            state.songsByTitle = action.payload
        })
        builder.addCase(findSongBySinger.fulfilled, (state, action) =>{
            state.songsBySinger = action.payload
        })
        builder.addCase(findSongByAuthor.fulfilled, (state, action) => {
            state.songsByAuthor = action.payload
        })
        builder.addCase(getSongByPll.fulfilled, (state, action) => {
            state.songsByPll = action.payload
        })
        builder.addCase(findPlaylistByTitle.fulfilled, (state, action) => {
            state.playlistByTitle = action.payload
        })
    }
})
export default songSlice.reducer;