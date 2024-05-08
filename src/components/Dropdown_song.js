import React, {useEffect, useState} from 'react';
import {AiOutlineEllipsis} from "react-icons/ai";
import {Dropdown} from "antd";
import axios from "axios";
import {toast} from "react-toastify";

function DropdownSong({idSong}) {
    const [playlist, setPlaylist] = useState([])
    const idUser = localStorage.getItem("idUser")

    useEffect(() => {
        if(idUser != null){
            axios.get("http://localhost:8080/playlist/user/" + idUser).then((res) => {
                setPlaylist(res.data)
            })
        }
    }, []);

    const items= [
        {
            key: '#',
            label: (
                <p>
                    Thêm vào playlist
                </p>
            ),
        },
    ];

    playlist.map((Pll) => {
        let item = {
            key: Pll.id,
            label: (
                <button onClick={()=>{
                    checkSongToPll(idSong,Pll.id);
                }}>
                    {Pll.title}
                </button>
            ),
        }
        items.push(item)
    })

    return (
        <>
            <Dropdown
                menu={{
                    items,
                }}
                placement="topLeft"
                arrow
            >
                <AiOutlineEllipsis size={20} className="text-white"/>
            </Dropdown>
        </>
    )
    function addSongToPll(idSong,idPll) {
        if (idUser != null) {
            axios.post("http://localhost:8080/playlist/song/create/" + idPll + "/" + idSong).then(() => {
                toast.success("Thêm thành công vào playlist")
            })
        }
    }

    function checkSongToPll(idSong, idPll) {
        axios.get("http://localhost:8080/playlist/song/check/" + idPll + "/" + idSong).then((response) => {
            const isSongInPll = response.data;
            if (isSongInPll == false) {
                addSongToPll(idSong, idPll);
            } else {
                toast.error("Bài hát đã có trong playlist")
            }
        })
    }

}
export default DropdownSong;