import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect, useState} from "react";
import {SongItem} from "./index";
import {hotSongsList, newSongsList, favoriteSongs} from "../service/SongService";
import {AppContext} from "../Context/AppContext";

const NewRelease = () => {
    const [isActive, setisActive] = useState(0);
    const {isFlag} = useContext(AppContext);
    const dispatch = useDispatch();
    const songsLates = useSelector((store)=>{
        return store.songStore.songsLates
    })
    const songHot = useSelector((store)=>{
        return store.songStore.songHot
    })
    const favoriteSong = useSelector((store)=>{
        return store.songStore.favoriteSongs;
    })

    useEffect(() => {
        dispatch(newSongsList())
    }, [isFlag]);

    useEffect(() => {
        dispatch(hotSongsList())
    }, [isFlag]);

    useEffect(()=>{
        dispatch(favoriteSongs())
    },[isFlag])

    return (
        <div>
            <div className='mt-12 px-[59px] flex flex-col gap-5' style={{color: "white"}}>
                <div className='flex items-center justify-between'>
                    <h3 className='text-[20px] font-bold'>Mới phát hành</h3>
                    <span className='text-xs'>TẤT CẢ</span>
                </div>
                <div className='flex items-center gap-5 text-xs'>
                    <button
                        onClick={() => {
                            setisActive(0)
                        }}
                        type={'button'}
                        className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-transparent ${isActive === 0 && 'bg-[#0E8080] text-white'}`}
                    >
                        VIỆT NAM
                    </button>
                    <button
                        onClick={() => {
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
                            key={item.id}
                            thumbnail={item.img_url}
                            title={item.title}
                            artists={item.singer}
                            author={item.author}
                            countLikes={item.countLike}
                            countListen={item.listenCount}
                            releaseDate={new Date()}
                            check={false}
                        />

                    ))}
                </div>
            </div>
            <div className='mt-12 px-[59px] flex flex-col gap-5' style={{color: "white"}}>
                <div className='flex items-center justify-between'>
                    <h3 className='text-[20px] font-bold'>Thịnh hành</h3>
                    <span className='text-xs'>TẤT CẢ</span>
                </div>
                <div className='flex items-center gap-5 text-xs'>
                    <button
                        onClick={() => {
                            setisActive(0)
                        }}
                        type={'button'}
                        className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-transparent ${isActive === 0 && 'bg-[#0E8080] text-white'}`}
                    >
                        VIỆT NAM
                    </button>
                    <button
                        onClick={() => {
                            setisActive(1)
                        }}
                        type={'button'}
                        className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 text-white bg-transparent ${isActive === 1 && 'bg-main-500'}`}
                    >
                        QUỐC TẾ

                    </button>
                </div>
                <div className={'row'}>
                    {songHot?.map(item => (
                        <SongItem
                            sid={item.id}
                            key={item.id}
                            thumbnail={item.img_url}
                            title={item.title}
                            artists={item.singer}
                            author={item.author}
                            countLikes={item.countLike}
                            countListen={item.listenCount}
                            releaseDate={new Date()}
                            check={false}
                        />
                    ))}
                </div>
            </div>
            <div className='mt-12 px-[59px] flex flex-col gap-5' style={{color: "white"}}>
                <div className='flex items-center justify-between'>
                    <h3 className='text-[20px] font-bold'>Yêu thích</h3>
                    <span className='text-xs'>TẤT CẢ</span>
                </div>
                <div className='flex items-center gap-5 text-xs'>
                    <button
                        onClick={() => {
                            setisActive(0)
                        }}
                        type={'button'}
                        className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-transparent ${isActive === 0 && 'bg-[#0E8080] text-white'}`}
                    >
                        VIỆT NAM
                    </button>
                    <button
                        onClick={() => {
                            setisActive(1)
                        }}
                        type={'button'}
                        className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 text-white bg-transparent ${isActive === 1 && 'bg-main-500'}`}
                    >
                        QUỐC TẾ

                    </button>
                </div>
                <div className={'row'}>
                    {favoriteSong?.map(item => (
                        <SongItem
                            sid={item.id}
                            key={item.id}
                            thumbnail={item.img_url}
                            title={item.title}
                            artists={item.singer}
                            author={item.author}
                            countLikes={item.countLike}
                            countListen={item.listenCount}
                            releaseDate={new Date()}
                            check={false}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default NewRelease
