import axios from "../../axios";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function ShowSearchBySongName(){
    let idSong = useParams();
    let [songs , setSongs] = useState({})
    // useEffect(() => {
    //     console.log("pẩm", idSong)
    //     axios.get('http://localhost:8080/songs/'+idSong.id).then((res)=>{
    //         setSongs(res.data)
    //     })
    // }, []);

    const songs1 = {}
    useEffect(() => {
        setSongs(songs1)
    }, []);
    return(
        <>
            <div className='mt-12 px-[59px] flex flex-col gap-5'>
                <div className='flex items-center justify-between'>
                    <h3 className='text-[20px] font-bold'>Bài Hát</h3>
                    <span className='text-xs'>TẤT CẢ</span>
                </div>
                <div className='flex items-center gap-5 text-xs' >
                </div>
                <div
                    className={'flex flex-wrap w-full '}>
                        <div
                            className={'w-[30%] flex-auto flex  p-[10px] gap-10 hover:bg-main-200 rounded-md cursor-pointer'}>
                            <img src={songs.url_img} alt='' className={`w-[60px] h-[60px]'}object-cover rounded-md`}/>
                            <div className={'flex flex-col'}>
                                <span className={'text-sm font-semibold'}>{songs.nameSong}</span>
                                <span className={'text-xs text-gray-400'}>{songs.description}</span>
                            </div>
                        </div>
                </div>
            </div>
            <div className='mt-12 px-[59px] flex flex-col gap-5'>
                <div className='flex items-center justify-between'>
                    <h3 className='text-[20px] font-bold'>Ca Sĩ</h3>
                    <span className='text-xs'>TẤT CẢ</span>
                </div>
                <div className='flex items-center gap-5 text-xs' >
                </div>
                <div
                    className={'flex flex-wrap w-full '}>
                    <div
                        className={'w-[30%] flex-auto flex  p-[10px] gap-10 hover:bg-main-200 rounded-md cursor-pointer'}>
                        <img src={songs.url_img} alt='' className={`w-[60px] h-[60px]'}object-cover rounded-md`}/>
                        <div className={'flex flex-col'}>
                            <span className={'text-sm font-semibold'}>{songs.nameSong}</span>
                            <span className={'text-xs text-gray-400'}>{songs.description}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}export default ShowSearchBySongName