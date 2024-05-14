import {useDispatch, useSelector} from "react-redux";
import {SongItem} from "./index";
import React from "react";
import {getSongByPll} from "../service/SongService";
import {useNavigate} from "react-router-dom";

const SearchResult = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const songsByTitle = useSelector((store)=>{
        return store.songStore.songsByTitle
    })

    const songsBySinger = useSelector((store)=>{
        return store.songStore.songsBySinger
    })

    const songsByAuthor = useSelector((store)=>{
        return store.songStore.songsByAuthor
    })

    const playlistByTitle = useSelector((store)=>{
        return store.songStore.playlistByTitle
    })

    function getSongsPll(value) {
        dispatch(getSongByPll(value))
        localStorage.setItem("idPll", value);
        navigate("/viewPlaylist/"+value)
    }

    return (
        <div className={'overflow-y-auto w-full'}>
            <div className='mt-8 px-[59px] flex flex-col gap-4' style={{color: "white"}}>
                <div className='flex items-center justify-between'>
                    <h2 className='text-[23px] font-bold'>Kết quả tìm kiếm</h2>
                </div>
                <div className='flex items-center justify-between'>
                    <h4 className='text-[18px] font-bold'>Bài hát</h4>
                    <span className='text-xs'>TẤT CẢ</span>
                </div>
                <div className={'row'}>
                    {songsByTitle?.map(item => (
                        <SongItem
                            sid={item.id}
                            key={item.id}
                            thumbnail={item.img_url}
                            title={item.title}
                            artists={item.singer}
                            author={item.author}
                            countLikes={item.countLike}
                            releaseDate={new Date()}
                        />
                    ))}
                </div>
            </div>
            <div className='mt-8 px-[59px] flex flex-col gap-4' style={{color: "white"}}>
                <div className='flex items-center justify-between'>
                    <h4 className='text-[18px] font-bold'>Ca sĩ</h4>
                    <span className='text-xs'>TẤT CẢ</span>
                </div>
                <div className={'row'}>
                    {songsBySinger?.map(item => (
                        <SongItem
                            sid={item.id}
                            key={item.id}
                            thumbnail={item.img_url}
                            title={item.title}
                            artists={item.singer}
                            author={item.author}
                            countLikes={item.countLike}
                            releaseDate={new Date()}
                        />
                    ))}
                </div>
            </div>
            <div className='mt-8 px-[59px] flex flex-col gap-4' style={{color: "white"}}>
                <div className='flex items-center justify-between'>
                    <h4 className='text-[18px] font-bold'>Nhạc sĩ</h4>
                    <span className='text-xs'>TẤT CẢ</span>
                </div>
                <div className={'row'}>
                    {songsByAuthor?.map(item => (
                        <SongItem
                            sid={item.id}
                            key={item.id}
                            thumbnail={item.img_url}
                            title={item.title}
                            artists={item.singer}
                            author={item.author}
                            countLikes={item.countLike}
                            releaseDate={new Date()}
                        />
                    ))}
                </div>
            </div>
            <div className='mt-8 px-[59px] flex flex-col gap-4' style={{color: "white"}}>
                <div className='flex items-center justify-between'>
                    <h4 className='text-[18px] font-bold'>Playlist</h4>
                    <span className='text-xs'>TẤT CẢ</span>
                </div>
                <div className={'row'}>
                    {playlistByTitle?.map(item => (
                        <div className="text-white w-[300px] h-[300px] text-center p-2 mt-2">
                            <div className="w-[150px] h-[150px] mx-auto rounded-xl overflow-hidden" onClick={()=>{
                                getSongsPll(item.id)}
                            }>
                                <img
                                    className="rounded-xl transition-transform duration-300 transform hover:scale-125 hover:cursor-pointer"
                                    src="https://cdn.pixabay.com/photo/2017/05/09/10/03/music-2297759_1280.png"
                                    alt=""/>
                            </div>
                            <div className="flex items-center justify-center mt-2">
                                <span>
                                    {/*<Link className="text-xl text-f text-white font-semibold" onClick={() => {*/}
                                    {/*        getSongsPll(i.id)*/}
                                    {/*}*/}
                                    {/*} to={"/viewPlaylist/" + i.id}>*/}
                                            {item.title}
                                    {/*</Link>*/}
                                </span>
                            </div>
                            <p>Tạo bởi {item.appUser.userName}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default SearchResult
