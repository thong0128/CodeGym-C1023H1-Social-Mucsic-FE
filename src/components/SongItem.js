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
import SongMenu from "../songMenu/SongMenu";


const SongItem = ({thumbnail, title, artists, sid, author, countLikes, countListen,check, releaseDate, order, percent, style, sm}) => {
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
            toggleFlag();
        })
    }
    const handleClick = () => {
        handleCount();
        dispatch(findSongById(sid));

    };
    return (
        <div className="col-md-4 song-item hover:cursor-pointer" onClick={()=>handleClick()}>
            <div >
                <div
                    className={'group flex p-3 rounded-md hover:bg-white hover:bg-opacity-10'}>
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                        <img
                            onClick={() => {
                                navigate("/detailSong/" + sid)
                            }}
                            src={thumbnail} alt='' className="h-full w-full object-cover object-center"/>
                    </div>
                    <div className={'ml-4 flex flex-1 flex-col'}>
                        <div>
                            <div className="flex justify-between text-base font-medium mb-2">
                                <h3>
                                    <Link to={`/detailSong/${sid}`}
                                          className="text-slate-900 font-semibold">{title}</Link>
                                </h3>
                            </div>
                            <p className="mb-1 text-slate-500 text-sm">{artists}</p>
                            <p className="mb-1 text-slate-500 text-sm">{author}</p>
                        </div>
                    </div>
                    <div  className="w-15">
                        <div className="like-item grid grid-cols-2 grid-rows-4 w-10 justify-center items-center text-center opacity-50">
                            <div onClick={() => handleLike()}>
                                {checkLike ? <IoHeartSharp size={16}/> : <IoHeartOutline size={16}/>}
                            </div>
                            <div>{countLikes}</div>
                            <div><FaHeadphonesAlt size={15}/></div>
                            <div>{countListen}</div>
                        </div>
                    </div>
                    <div className="w-10">
                        <button className="drop-menu font-medium text-indigo-600 hover:text-indigo-500 py-3 px-2 ml-2">
                            {check ? <SongMenu idSong={sid}/> : <Dropdown_song idSong={sid}/>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SongItem
