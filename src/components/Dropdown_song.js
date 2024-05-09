import React, {useEffect, useState} from 'react';
import {AiOutlineEllipsis} from "react-icons/ai";
import {Dropdown} from "antd";
import axios from "axios";
import {toast} from "react-toastify";
import {MdOutlinePlaylistAdd} from "react-icons/md";
import {SiApplemusic} from "react-icons/si";

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
                <div className="flex justify-center items-center h-[40px] hover:cursor-default">
                    <span className="text-base text-f font-semibold">
                        <MdOutlinePlaylistAdd size={24} className="text-gray-300 text-center"/>
                    </span>
                    <div
                        className="ml-2 text-f text-base text-gray-300 font-semibold">Thêm vào playlist
                    </div>
                </div>

            ),

        },
    ];

    playlist.map((Pll) => {
        let item = {
            key: Pll.id,
            label: (
                <div className="flex justify-center items-center text-gray-300 w-full h-[30px] hover:bg-[#493961] hover:cursor-pointer pl-[20px]"
                onClick={()=>{checkSongToPll(idSong, Pll.id)}}>
                    <span className="text-base text-f font-semibold">
                        <SiApplemusic size={20} className="text-gray-300 text-center bg-gradient-to-r from-red-300 via-purple-500 to-blue-500 rounded"/>
                    </span>
                    <div
                        className="w-full ml-2 text-f text-base text-gray-300">{Pll.title}
                    </div>
                </div>

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