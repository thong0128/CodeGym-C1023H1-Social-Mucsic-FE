import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import SongMenu from "../songMenu/SongMenu";
import {AppContext} from "../Context/AppContext";
// import {findSongById} from "../service/SongService";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function UserSongList() {
    const [idUser, setidUser] = useState(localStorage.getItem("idUser"))
    console.log(idUser);
    const [list, setList] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/songs/findUserSongs/" + idUser).then((res) => {
            setList(res.data);
            console.log(list);
        })
    },[]);
    return (
        <>
            <div style={{backgroundColor: "#3c2452", color:"white"}}>
                <div className="container mt-4" style={{paddingBlock:50}}>
                    <h1 className="font-weight-bold" style={{fontSize:30}}>Danh sách bài hát</h1>
                    <div className="row" style={{paddingTop: 40}}>
                        {list.map((i, key) => {
                            return (
                                <div
                                    className={'w-[30%] flex-auto flex  p-[10px] gap-10 hover:bg-main-200 rounded-md cursor-pointer hover:text-black'}>
                                    <img
                                        src={i.img_url == null ? "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/a/3/6/a/a36a7d1fecd4333c96def2d3f71a6b9b.jpg"
                                            : i.img_url}
                                        alt='' className={'w-[60px] h-[60px]'}/>
                                    <div className={'flex flex-col'}>
                                        <span className={'text-sm font-semibold'}>{i.title}</span>
                                        <span className={'text-xs text-gray-400'}>{i.singer}</span>
                                        <span className={'text-xs text-gray-700'} style={{color: 'white'}}>{i.listenCount}</span>
                                    </div>
                                    <div className={'flex flex-col'}>
                                        <SongMenu idSong={i.id}/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}