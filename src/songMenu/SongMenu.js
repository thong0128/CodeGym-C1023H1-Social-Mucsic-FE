import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown} from 'antd';
import {AiOutlineDelete, AiOutlineEllipsis} from "react-icons/ai";
import axios from "axios";
import {toast} from "react-toastify";
import "./hover.css"
import swal from "sweetalert";
import {AppContext} from "../Context/AppContext";
import {useNavigate} from "react-router-dom";
import {SiApplemusic} from "react-icons/si";
import {HiOutlinePencil} from "react-icons/hi";

const SongMenu = ({idSong}) => {
    let [checkDelete, setCheckDelete] = useState(false)
    const [playlists, setPlaylist] = useState([])
    const idUser = localStorage.getItem("idUser")
    useEffect(() => {
        if(idUser != null){
            axios.get("http://localhost:8080/songs/findUserSongs/" + idUser).then((res) => {
                setPlaylist(res.data)
            })
        }
    }, []);
    const navigate = useNavigate()
    const {toggleFlag} = useContext(AppContext);
    const items = [

        {
            key: '2',
            label: (
                <div
                    className="flex justify-center items-center text-gray-300 w-full h-[35px] hover:bg-[#493961] hover:cursor-pointer pl-[20px]"
                    onClick={() => {
                        edit(idSong)
                    }}>
                    <span className="text-base text-f font-semibold">
                        <HiOutlinePencil size={20}
                                      className="text-gray-300 text-center rounded"/>
                    </span>
                    <div
                        className="w-full ml-[10px] text-f text-base text-gray-300">Sửa bài hát
                    </div>
                </div>

            ),
        },
        {
            key: '3',
            label: (
                <div
                    className="flex justify-center items-center text-gray-300 w-full h-[35px] hover:bg-[#493961] hover:cursor-pointer pl-[20px]"
                    onClick={() => {
                        deleteSong(idSong)
                    }}>
                    <span className="text-base text-f font-semibold">
                        <AiOutlineDelete size={20}
                                      className="text-gray-300 text-center rounded"/>
                    </span>
                    <div
                        className="w-full ml-[10px] text-f text-base text-gray-300">Xóa bài hát
                    </div>
                </div>

            ),
        },
        ]
    ;
    return (
        <>
            <Dropdown
                menu={{
                    items,
                }}
                placement="topRight"
                arrow
            >
                <AiOutlineEllipsis size={20} className="text-white"/>
            </Dropdown>
        </>
    )


    function addPlayList(idPlaylist) {
        if (idUser != null) {
            axios.put("http://localhost:8080/songs/addPlayList/" + idSong + "/" + idPlaylist).then((res) => {
                toast.success("Thêm thành công vào playlist")
            })
        }
    }

    function edit(id) {
        navigate("/update/" + id)
    }

    function deleteSong(id) {
        swal({
            text: "Bạn có muốn xóa bài hát này không?",
            icon: "info",
            buttons: {
                cancel: true,
                confirm: true
            },
        }).then(r => {
            if (r) {
                axios.delete("http://localhost:8080/songs/" + id)
                    .then(() => {
                            setCheckDelete(!checkDelete)
                            toggleFlag()
                            toast.success("Xóa thành công!", {autoClose: 700})
                        }
                    )
            }
        })
    }
}

export default SongMenu;