import React, {useContext, useEffect, useState} from 'react';
import {SongItem} from "./index";
import axios from "axios";
import {AppContext} from "../Context/AppContext";

function ViewPlaylist() {
    const [List, setList] = useState();
    const {isFlag} = useContext(AppContext);
    const pllId = localStorage.getItem("idPll");

    useEffect(() => {
        axios.get(`http://localhost:8080/playlist/song/${pllId}`).then((res) => {
            setList(res.data);
        })
    }, [isFlag]);

    return (
        <>
            <div className='mt-8 px-[59px] flex flex-col gap-4' style={{color: "white"}}>
                <div className='flex items-center justify-between'>
                    <h4 className='text-[18px] font-bold'>Bài hát</h4>
                    <span className='text-xs'>TẤT CẢ</span>
                </div>
                <div className={'row'}>
                    {List?.map(item => (
                        <SongItem
                            sid={item.id}
                            key={item.id}
                            thumbnail={item.img_url}
                            title={item.title}
                            artists={item.singer}
                            author={item.author}
                            countLikes={item.countLike}
                            releaseDate={new Date()}
                            check={false}
                            removePll={true}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default ViewPlaylist;