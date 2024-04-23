import {IoTrashBin} from "react-icons/io5";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {SongItem} from "./index";
import {apiGetDetailPlaylist} from "../apis";
import axios from "axios";
import {data} from "autoprefixer";

const SidebarRight = () => {
    const [songs, setSongs] = useState([])
    const [isRecent, setisRecent] = useState(false)
    const {playlist, setPlaylist} = useState()
    // useEffect(() => {
    //     axios.get("http://localhost:8080/songs/searchByIdPll/" + 1).then((res)=>{
    //         setSongs(res.data);
    //
    //     })
    // }, []);

    const searchByIdPll = {}
    useEffect(() => {
        setSongs(searchByIdPll)
    }, []);
    return (
        <div className={'flex flex-col text-xs w-full'}>
            <div className={'h-[70px] w-full flex-none py-[14px] px-2 gap-8 flex items-center justify-between'}>
                <div className={'flex  flex-auto gap-8 justify-center bg-main-200 rounded-l-full rounded-r-full py-[6px] px-[6px] cursor-pointer'}>
                    <span
                        onClick={() => setisRecent(prev => !prev)}
                        className={`py-[5px] ${!isRecent && 'bg-main-100'} flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
                    >
                        Danh sách phát</span>
                    <span
                        onClick={() => setisRecent(prev => !prev)}
                        className={`py-[5px] ${isRecent && 'bg-main-100'} flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
                    >
                        Nghe gần đây</span>
                </div>
                <span className={'p-2 rounded-full hover:bg-main-200 cursor-pointer'}><IoTrashBin size={14}/></span>
            </div>
            <div className={'w-full flex-col flex px-2 '}>
                {songs?.map(item => (
                    <SongItem
                        sid={item.id}
                        key = {item.id}
                        thumbnail={item.url_img}
                        title={item.nameSong}
                        artists={item.singer}
                        releaseDate={new Date()}

                    />
                ))}
                 style='bg-main-500 text-white'
                />
                <div className={'flex flex-col text-black pt-[15px] px-2 pb-[5px]'}>
                    <span className={' text-sm font-bold'}>Tiếp theo</span>
                    <span className={'opacity-70 text-xs flex gap-1'}>
                        <span>Từ playlist</span>
                        <span className={'font-semibold text-main-500'}>{curSongData?.album?.title}</span>
                    </span>
                </div>
                {playlist &&  <div className={'flex flex-col'}>
                    {songs?.map(item => (
                        <SongItem
                            sid={item.id}
                            key = {item.id}
                            thumbnail={item.url_img}
                            title={item.nameSong}
                            artists={item.singer}
                            releaseDate={new Date()}

                        />
                    ))}
                </div>}


            </div>
        </div>
    )
}
export default SidebarRight

