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
import swal from "sweetalert";
import {toast} from "react-toastify";
import {IoMdRemoveCircleOutline} from "react-icons/io";

const SongItem = ({thumbnail, title, artists, sid, author, countLikes, countListen,check, removePll,location}) => {
    let userId = localStorage.getItem("idUser");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {toggleFlag} = useContext(AppContext);
    const [checkLike, setCheckLike] = useState();
    const pllId = localStorage.getItem("idPll");

    useEffect(() => {
        userId?
            axios.get(`http://localhost:8080/songs/users/likes/${userId}/${sid}`).then((res) => {
                setCheckLike(res.data)
            }) : setCheckLike(false)
    },[userId,sid]);

    const handleLike = ()=>{
        axios.post(`http://localhost:8080/songs/likes/${userId}/${sid}`).then((res) => {
            toggleFlag();
        })
    }

    const handleCount = ()=>{
        axios.put(`http://localhost:8080/songs/count/${sid}`).then((res) => {
            toggleFlag();
        })
    }

    const handleClick = () => {
        handleCount();
        dispatch(findSongById(sid));
        toggleFlag();
        localStorage.setItem("location",location)
    };

    const deleteSongInPll=(pllId,sId) =>{
        swal({
            text: "Bạn có muốn xóa bài hát này không?",
            icon: "info",
            buttons: {
                cancel: true,
                confirm: true
            },
        }).then(r => {
            if (r) {
                axios.delete("http://localhost:8080/playlist/song/"+pllId+"&"+sId).then((res) => {
                    toggleFlag();
                    toast.success("Xóa thành công!", {position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 500})
                })
            }
        })
    }


    return (
        <div className=" song-item hover:cursor-pointer" onClick={()=>handleClick()}>
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
                                          className="text-slate-900 font-semibold text-f">{title}</Link>
                                </h3>
                            </div>
                            <p className="mb-1 text-slate-500 text-sm text-f">{artists}</p>
                            <p className="mb-1 text-slate-500 text-sm text-f">{author}</p>
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
                    <div className="w-16">
                        {removePll ?
                            <button className="drop-menu font-medium text-slate-300 opacity-50 hover:text-slate-50 hover:scale-125 py-3 px-2 ml-2 "
                                    onClick={()=>{deleteSongInPll(pllId,sid)}}>
                                <IoMdRemoveCircleOutline size={24}/>
                            </button>
                            : <button
                            className="drop-menu font-medium text-indigo-600 hover:text-indigo-500 py-3 px-2 ml-2">
                            {check ? <SongMenu idSong={sid}/> : <Dropdown_song idSong={sid}/>}
                        </button>}

                    </div>
                </div>
            </div>
        </div>
    )
}
export default SongItem
