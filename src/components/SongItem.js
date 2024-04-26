import moment from "moment";
import 'moment/locale/vi'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {findSongById} from "../service/SongService";
import {BiDotsVerticalRounded} from "react-icons/bi";
import Dropdown_song from "./Dropdown_song";
import {CiHeart} from "react-icons/ci";
import React, {useState} from "react";
import {handleBlur} from "react-modal/lib/helpers/focusManager";
import {FaHeart} from "react-icons/fa";

const SongItem = ({thumbnail, title, artists, sid, releaseDate, order, percent, style, sm}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLike, setIsLike] = useState(false)
    const handleLike = ()=>{
        setIsLike(!isLike)
        console.log(isLike)

    }
    return (
        <div className="col-md-4 song-item">
            <div
                onClick={() => {
                    console.log("sip:", sid)
                    dispatch(findSongById(sid))
                }}
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
                    </div>
                </div>
                <div className={'flex flex-col'} onClick={handleLike}>
                    {isLike? <FaHeart size={18}/>:  <CiHeart size={24}/> }
                </div>
                <div className="flex">
                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500"><Dropdown_song
                        idSong={sid}/></button>
                </div>
            </div>
        </div>
    )
}
export default SongItem
