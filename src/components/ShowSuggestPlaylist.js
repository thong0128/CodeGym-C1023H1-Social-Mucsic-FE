import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {getSongByPll} from "../service/SongService";
import {useDispatch} from "react-redux";

const ShowSuggestPlaylist = () => {
    const [list, setList] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const idUser = localStorage.getItem("idUser");
    useEffect(() => {
        axios.get("http://localhost:8080/playlist/suggest/" + idUser).then((res) => {
            setList(res.data);
        }, [idUser]);
    });


    function getSongsPll(value) {
        dispatch(getSongByPll(value))
        localStorage.setItem("idPll", value);
        navigate("/viewPlaylist/" + value)
    }

    return (
        <>
            <div style={{color: "white", marginTop: 30}}>
                <div className="name_playlist px-4" style={{paddingBottom: 20, fontSize: 30, paddingLeft: 10}}>
                    Playlist dành cho bạn
                </div>
                <div className="flex flex-row flex-wrap gap-12 px-4">
                    {list.map((i, key) => {
                        return (
                            <div className="text-white w-[300px] h-[300px] text-center p-2 mt-2">
                                <div className="w-[250px] h-[250px] mx-auto rounded-xl overflow-hidden"
                                     onClick={() => {
                                         getSongsPll(i.id)
                                     }
                                }>
                                    <img
                                        className="rounded-xl transition-transform duration-300 transform hover:scale-125 hover:cursor-pointer"
                                        src="https://cdn.pixabay.com/photo/2017/05/09/10/03/music-2297759_1280.png"
                                        alt=""/>
                                </div>
                                <div className="flex items-center justify-center mt-2"><span>
                                    <Link className="text-xl text-f text-white font-semibold" onClick={() => {
                                        getSongsPll(i.id)
                                    }
                                    } to={"/viewPlaylist/" + i.id}>
                                        {i.title}
                                    </Link>
                                </span>
                                </div>
                                    <p>Tạo bởi {i.appUser.userName}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </>
        );
    }

export default ShowSuggestPlaylist;