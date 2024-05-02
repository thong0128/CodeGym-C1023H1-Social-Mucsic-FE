import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect} from "react";
import {SongItem} from "./index";
import {newSongsList} from "../service/SongService";
import {AppContext} from "../Context/AppContext";

const SearchResult = () => {
    const {isFlag } = useContext(AppContext);
    const dispatch = useDispatch();

    const songsByTitle = useSelector((store)=>{
        return store.songStore.songsByTitle
    })

    const songsBySinger = useSelector((store)=>{
        return store.songStore.songsBySinger
    })

    const songsByAuthor = useSelector((store)=>{
        return store.songStore.songsByAuthor
    })

    useEffect(() => {
        dispatch(newSongsList())
    }, [isFlag]);

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
                            key = {item.id}
                            thumbnail={item.img_url}
                            title={item.title}
                            artists={item.singer}
                            author={item.author}
                            countLikes = {item.countLike}
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
                            key = {item.id}
                            thumbnail={item.img_url}
                            title={item.title}
                            artists={item.singer}
                            author={item.author}
                            countLikes = {item.countLike}
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
                            key = {item.id}
                            thumbnail={item.img_url}
                            title={item.title}
                            artists={item.singer}
                            author={item.author}
                            countLikes = {item.countLike}
                            releaseDate={new Date()}
                        />
                    ))}
                </div>
            </div>
            <div className={'mt-12 px-[59px] flex flex-col gap-5'}>
            </div>
            <div className={'mt-12 px-[59px] flex flex-col gap-5'}>
            </div>
        </div>
    )
}
export default SearchResult
