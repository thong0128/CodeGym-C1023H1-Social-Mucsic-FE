import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AppContext} from "../Context/AppContext";
import {SongItem} from "./index";


const ShowListSong = () => {
    const {isFlag } = useContext(AppContext);
    const [idUser, setIdUser] = useState(localStorage.getItem("idUser"))
    const [list, setList] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/songs/findUserSongs/${idUser}`).then((res) => {
            setList(res.data);
        })
    }, [isFlag]);
    return (
        <>
            <div style={{backgroundColor: "#3c2452", color:"white"}}>
                <div className="container mt-4" style={{paddingBlock: 50}}>
                    <h1 className="font-weight-bold" style={{fontSize: 30}}>Danh sách bài hát</h1>
                    <div className={'row'}>
                        {list?.map(item => (
                            <SongItem
                                sid={item.id}
                                key={item.id}
                                thumbnail={item.img_url}
                                title={item.title}
                                artists={item.singer}
                                countLikes={item.countLike}
                                releaseDate={new Date()}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
export default ShowListSong;