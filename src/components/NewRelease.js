import {useDispatch, useSelector} from "react-redux";
import React, {useContext, useEffect, useState} from "react";
import {SongItem} from "./index";
import store from "../store/Store";
import {findAllSong, newSongsList} from "../service/SongService";
import {AppContext} from "../Context/AppContext";
import Dropdown_song from "./Dropdown_song";

const NewRelease = () => {
    const [isActive, setisActive] = useState(0);
    const {isFlag} = useContext(AppContext);
    const dispatch = useDispatch();
    const songsLates = useSelector((store)=>{
        console.log("list song: ", store.songStore.songsLates)
        return store.songStore.songsLates
    })

    useEffect(() => {
        dispatch(newSongsList())
    }, [isFlag]);

    return (
        <div className='mt-12 px-[59px] flex flex-col gap-5' style={{color: "white"}}>
            <div className='flex items-center justify-between'>
                <h3 className='text-[20px] font-bold'>Mới phát hành</h3>
                <span className='text-xs'>TẤT CẢ</span>
            </div>
            <div className='flex items-center gap-5 text-xs' >
                <button
                    onClick={() =>{
                        setisActive(0)
                    }}
                    type={'button'}
                    className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-transparent ${isActive === 0 && 'bg-[#0E8080] text-white'}`}
                >
                    VIỆT NAM
                </button>
                <button
                    onClick={() =>{
                        setisActive(1)
                    }}
                    type={'button'}
                    className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 text-white bg-transparent ${isActive === 1 && 'bg-main-500'}`}
                >
                    QUỐC TẾ

                </button>
            </div>
            <div className={'row'}>
                {songsLates?.map(item => (
                        <SongItem
                            sid={item.id}
                            key = {item.id}
                            thumbnail={item.img_url}
                            title={item.title}
                            artists={item.singer}
                            author={item.author}
                            countLikes = {item.countLike}
                            releaseDate={new Date()}
                            check = {false}
                        />
                ))}
            </div>
        </div>
    )
}
export default NewRelease
