const path = {
    PUBLIC :"/*",
    HOME: "",
    LOGIN: "login",
    REGISTER: "register",
    // user
    UPDATE_USER: "updateProfile",
    UPDATE_PASS: "updatePassword",

    // song
    CREATE_SONG: "create",
    DETAIL_SONG: "detailSong/:id",
    SUGGEST_PLAYLIST:"suggestPlaylist/:uId",
    UPDATE_SONG:"update/:id",
    SHOW_LIST_SONGS: "showList",
    FILL:"fill",

    // playlist
    SHOW_PLAYLIST: "showPlaylist",
    VIEW_PLAYLIST: "viewPlaylist/:id",
    UPDATE_PLAYLIST: "updatePlayList/:id"

}
export default path