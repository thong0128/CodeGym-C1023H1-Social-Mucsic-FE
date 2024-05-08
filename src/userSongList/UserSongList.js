import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import SongMenu from "../songMenu/SongMenu";
import {AppContext} from "../Context/AppContext";
// import {findSongById} from "../service/SongService";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {IoHeartOutline, IoHeartSharp} from "react-icons/io5";
import {SongItem} from "../components";

export default function UserSongList() {
    const [idUser, setidUser] = useState(localStorage.getItem("idUser"))
    console.log(idUser);
    const [list, setList] = useState([]);
    const {isFlag, toggleFlag} = useContext(AppContext);
    useEffect(() => {
        axios.get("http://localhost:8080/songs/findUserSongs/" + idUser).then((res) => {
            setList(res.data);
            console.log(list);
        })
    },[isFlag]);
    return (
        <>
            <div className='mt-12 px-[59px] flex flex-col gap-5' style={{color: "white"}}>
                <p className="text-slate-200 font-semibold text-2xl">Danh sách bài hát</p>
                <div className={'row'}>
                    {list?.map(item => (
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
                            check={true}
                        />

                    ))}
                </div>
            </div>
        </>
    );
}