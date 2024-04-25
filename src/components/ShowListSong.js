import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import Dropdown_listSong from "./dropdown_listSong";
import {AppContext} from "../Context/AppContext";
import {findSongById} from "../service/SongService";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const ShowListSong = () => {
    const {isFlag } = useContext(AppContext);
    const dispatch = useDispatch()
    const [idUser, setIdUser] = useState(localStorage.getItem("idUser"))
    const [list, setList] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        axios.get("http://localhost:8080/songs/findUserSongs/1").then((res) => {
            setList(res.data);
            setIdUser(1)
        })
    }, [isFlag]);

    // useEffect(() => {
    //     axios.get("http://localhost:8080/songs/findUserSongs/1").then((res) => {
    //         setList(res.data);
    //         console.log(list);
    //     })
    // }, [isFlag]);

    return (
        <>
            <div style={{backgroundColor: "#3c2452", color:"white"}}>
                <div className="container mt-4" style={{paddingBlock:50}}>
                    <h1 className="font-weight-bold" style={{fontSize:30}}>Danh sách bài hát</h1>
                    <div className="row" style={{paddingTop: 40}}>
                        {list.map((i, key) => {
                            return (
                                <div
                                    onClick={()=>{
                                        dispatch(findSongById(i.id))
                                    }}
                                    className={'w-[30%] flex-auto flex  p-[10px] gap-10 hover:bg-main-200 rounded-md cursor-pointer hover:text-black'}>
                                    <img
                                        onClick={()=>{
                                            navigate("/detailSong/"+ i.id)
                                        }}
                                        src={i.url_img == null ? "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/a/3/6/a/a36a7d1fecd4333c96def2d3f71a6b9b.jpg"
                                            : i.url_img}
                                        alt='' className={'w-[60px] h-[60px]'}/>
                                    <div className={'flex flex-col'}>
                                        <span className={'text-sm font-semibold'}>{i.nameSong}</span>
                                        <span className={'text-xs text-gray-400'}>{i.singer}</span>
                                        <span className={'text-xs text-gray-700'} style={{color: 'white'}}>{i.listen_count}</span>
                                    </div>
                                    <div className={'flex flex-col'}>
                                        <Dropdown_listSong idSong={i.id}/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};
export default ShowListSong;