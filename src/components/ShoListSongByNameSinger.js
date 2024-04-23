import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from "../Context/AppContext";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {findSongById} from "../service/SongService";
import Dropdown_listSong from "./dropdown_listSong";
import moment from "moment/moment";
import Dropdown_song from "./Dropdown_song";

function ShoListSongByNameSinger(props) {
    const {isFlag } = useContext(AppContext);
    const dispatch = useDispatch()
    const nameSinger = useParams();
    const [list, setList] = useState([]);
    const navigate = useNavigate()
    // useEffect(() => {
    //     console.log(":uparam", nameSinger)
    //     axios.get("http://localhost:8080/songs/findAllByNameSinger/" + nameSinger.name).then((res) => {
    //         setList(res.data);
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
                                // <div
                                //     onClick={()=>{
                                //         dispatch(findSongById(i.id))
                                //     }}
                                //     className={'w-[30%] flex-auto flex  p-[10px] gap-10 hover:bg-main-200 rounded-md cursor-pointer hover:text-black'}>
                                //     <img
                                //         onClick={()=>{
                                //             navigate("/detailSong/"+ i.id)
                                //         }}
                                //         src={i.url_img == null ? "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/a/3/6/a/a36a7d1fecd4333c96def2d3f71a6b9b.jpg"
                                //             : i.url_img}
                                //         alt='' className={'w-[60px] h-[60px]'}/>
                                //     <div className={'flex flex-col'}>
                                //         <span className={'text-sm font-semibold'}>{i.nameSong}</span>
                                //         <span className={'text-xs text-gray-400'}>{i.singer}</span>
                                //         <span className={'text-xs text-gray-700'} style={{color: 'white'}}>{i.date}</span>
                                //     </div>
                                //     <div className={'flex flex-col'}>
                                //         <Dropdown_listSong idSong={i.id}/>
                                //     </div>
                                // </div>
                            <div
                                onClick={()=>{
                                    dispatch(findSongById(i.id))
                                }}
                                className={'group flex p-3 rounded-md hover:bg-main-200 hover:border border-gray-200 col-md-4 song-item'}>
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                                    <img
                                        style={{borderRadius: 10}}
                                        className={'w-[90px] h-[90px]'}
                                        onClick={()=>{
                                            navigate("/detailSong/"+ i.id)
                                        }}
                                        src={i.url_img == null ? "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/a/3/6/a/a36a7d1fecd4333c96def2d3f71a6b9b.jpg"
                                            : i.url_img}/>
                                </div>
                                <div className={'ml-4 flex flex-1 flex-col'}>
                                    <div>
                                        <div className="flex justify-between text-base font-medium">
                                            <h3>
                                                <a href="#" className="text-slate-900 group-hover:text-black font-semibold">{i.nameSong}</a>
                                            </h3>
                                        </div>
                                        <p className="mb-2 text-slate-500 group-hover:text-black text-sm">{i.singer}</p>
                                        <p className="mb-0 text-slate-500 group-hover:text-black text-sm">{i.date}</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500"><Dropdown_song idSong={i.id}/></button>
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

export default ShoListSongByNameSinger;