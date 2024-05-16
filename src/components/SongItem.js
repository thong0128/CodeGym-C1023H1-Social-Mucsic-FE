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
import SongMenu from "./SongMenu";
import swal from "sweetalert";
import {toast} from "react-toastify";
import {IoMdRemoveCircleOutline} from "react-icons/io";

const SongItem = ({thumbnail, title, artists, sid, author, countLikes, countListen,check, removePll,location}) => {
    let userId = localStorage.getItem("idUser");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {toggleFlag, isFlag} = useContext(AppContext);
    const [checkLike, setCheckLike] = useState();
    const pllId = localStorage.getItem("idPll");

    useEffect(() => {
        userId?
            axios.get(`http://localhost:8080/songs/users/likes/${userId}/${sid}`).then((res) => {
                setCheckLike(res.data);
                toggleFlag()
            }) : setCheckLike(false)
    },[userId,sid,isFlag]);

    const handleLike = (event)=>{
        event.stopPropagation();
        axios.post(`http://localhost:8080/songs/likes/${userId}/${sid}`).then((res) => {
            toggleFlag();
        })
    }

    const handleClick = () => {
        dispatch(findSongById(sid));
        toggleFlag();
        localStorage.setItem("location",location)
        localStorage.setItem("sId",sid);
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
        <div className="song-item hover:cursor-pointer" onClick={()=>handleClick()}>
            <div >
                <div className={'group flex rounded-md p-2 justify-center items-center'}>
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
                    <div className="w-[60px] like-item mt-2 ">
                            <div
                                className=" grid grid-cols-3 grid-rows-3 gap-y-2 w-full justify-center items-center text-center opacity-50">
                                <div className="flex justify-center items-center" onClick={(e) => handleLike(e)}>
                                    {checkLike ? <IoHeartSharp  size={16}/> : <IoHeartOutline size={16}/>}
                                </div>
                                <div className="col-span-2">{countLikes}</div>
                                <div className="flex justify-center items-center"><FaHeadphonesAlt size={15}/></div>
                                <div className="col-span-2">{countListen}</div>
                            </div>
                    </div>
                    <div className="w-16">
                        {removePll ?
                            <button
                                className="drop-menu font-medium text-slate-300 opacity-50 hover:text-slate-50 hover:scale-125 py-3 px-2 ml-2 "
                                onClick={() => {
                                    deleteSongInPll(pllId, sid)
                                }}>
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
