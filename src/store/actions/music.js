import actionTypes from "./actionTypes";



export const setCurSongId = (sid) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    sid
})

export const play = (flag) => ({
    type: actionTypes.PLAY,
    flag
})
export const setCurSongData = (data) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    data
})
export const setCurAlbumId = (pid) => ({
    type: actionTypes.SET_CUR_ALBUM_ID,
    pid
})
