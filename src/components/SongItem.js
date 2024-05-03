import 'moment/locale/vi'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { findSongById} from "../service/SongService";
import Dropdown_song from "./Dropdown_song";
import React, {useContext, useEffect, useState} from "react";
import {IoHeartOutline, IoHeartSharp} from "react-icons/io5";
import axios from "axios";
import {AppContext} from "../Context/AppContext";
import {FaHeadphonesAlt} from "react-icons/fa";


const SongItem = ({thumbnail, title, artists, sid, author, countLikes, countListen,releaseDate, order, percent, style, sm}) => {
    let userId = localStorage.getItem("idUser");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {toggleFlag} = useContext(AppContext);
    const [checkLike, setCheckLike] = useState()
    useEffect(() => {
        userId?
        axios.get(`http://localhost:8080/songs/users/likes/${userId}/${sid}`).then((res) => {
            setCheckLike(res.data)
        }) : setCheckLike(false)
    });
    const handleLike = ()=>{
        axios.post(`http://localhost:8080/songs/likes/${userId}/${sid}`).then((res) => {
            toggleFlag();
        })
    }

    const handleCount = ()=>{
        axios.put(`http://localhost:8080/songs/count/${sid}`).then((res) => {
            console.log("success")
        })
    }
    const handleClick = () => {
        handleCount();
        dispatch(findSongById(sid));
        toggleFlag();
    };
    return (
        <div className="col-md-4 song-item">
            <div onClick={handleClick}>
                <div
                    className={'group flex p-3 rounded-md hover:bg-main-200 hover:border border-gray-200'}>
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                        <img
                            onClick={() => {
                                navigate("/detailSong/" + sid)
                            }}
                            src={thumbnail} alt='' className="h-full w-full object-cover object-center"/>
                    </div>
                    <div className={'ml-4 flex flex-1 flex-col'}>
                        <div>
                            <div className="flex justify-between text-base font-medium">
                                <h3>
                                    <Link to={`/detailSong/${sid}`}
                                          className="text-slate-900 group-hover:text-black font-semibold">{title}</Link>
                                </h3>
                            </div>
                            <p className="mb-2 text-slate-500 group-hover:text-black text-sm">{artists}</p>
                            <p className="mb-2 text-slate-500 group-hover:text-black text-sm">{author}</p>
                        </div>
                    </div>
                    <div className={'flex flex-col'} onClick={handleLike}>
                        {checkLike ? <IoHeartSharp size={20}/> : <IoHeartOutline size={24}/>}
                        <FaHeadphonesAlt size={20}/>
                    </div>
                    <div className={'flex flex-col mx-2'}>
                        <span>{countLikes}</span>
                        <span>{countListen}</span>
                    </div>
                    <div className="flex">
                        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500"><Dropdown_song
                                idSong={sid}/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SongItem
