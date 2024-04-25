import moment from "moment";
import 'moment/locale/vi'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {findSongById} from "../service/SongService";
import {BiDotsVerticalRounded} from "react-icons/bi";
import Dropdown_song from "./Dropdown_song";
const SongItem = ({thumbnail, title, artists, sid, releaseDate, order, percent, style, sm}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    return (
        <div className="col-md-4 song-item">
            <div
                onClick={()=>{
                    console.log("sip:", sid)
                    dispatch(findSongById(sid))
                }}
                className={'group flex p-3 rounded-md hover:bg-main-200 hover:border border-gray-200'}>
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                    <img
                        onClick={()=>{
                            navigate("/detailSong/"+ sid)
                        }}
                        src={thumbnail} alt='' className="h-full w-full object-cover object-center"/>
                </div>
                <div className={'ml-4 flex flex-1 flex-col'}>
                    <div>
                        <div className="flex justify-between text-base font-medium">
                            <h3>
                                <a href="#" className="text-slate-900 group-hover:text-black font-semibold">{title}</a>
                            </h3>
                        </div>
                        <p className="mb-2 text-slate-500 group-hover:text-black text-sm">{artists}</p>
                    </div>
                </div>
                <div className="flex">
                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500"><Dropdown_song idSong={sid}/></button>
                </div>
            </div>
        </div>
    )
}
export default SongItem
