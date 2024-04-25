import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown} from 'antd';
import {AiOutlineMore} from "react-icons/ai";
import axios from "axios";
import {toast} from "react-toastify";
import "./hover.css"
import swal from "sweetalert";
import {AppContext} from "../Context/AppContext";
import {useNavigate} from "react-router-dom";

const Dropdown_listSong = ({idSong}) => {
    let [checkDelete, setCheckDelete] = useState(false)
    const [playlists, setPlaylist] = useState([])
    const idUser = localStorage.getItem("idUser")
    // useEffect(() => {
    //     if(idUser != null){
    //         axios.get("http://localhost:8080/playLists/findByIdUser/" + idUser).then((res) => {
    //             setPlaylist(res.data)
    //         })
    //     }
    // }, []);

    const navigate = useNavigate()
    const {toggleFlag} = useContext(AppContext);
    const items = [
        {
            key: '1',
            label: (
                <dev>
                    <select onChange={(e) => {
                        console.log("taget", e.target.value)
                        addPlayList(e.target.value)
                    }}>
                        <option>Thêm vào PlayList</option>
                        {playlists.map((i,key) => {
                            return(
                                <option value={i.id}>{i.namePlayList}</option>
                            )
                        })}
                    </select>
                </dev>

            ),
        },
        {
            key: '2',
            label: (
                <a onClick={()=>{
                    edit(idSong)
                }}>
                    Sửa bài hát
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <div onClick={() => {
                    deleteSong(idSong)
                }}>
                    Xóa bài hát
                </div>
            ),
        },
    ];
    return (
        <>
            <Dropdown
                menu={{
                    items,
                }}
                placement="topRight"
                arrow
            >
                <Button style={{backgroundColor: "#3C2C52", border: "none", color: "white"}} ><AiOutlineMore/></Button>
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

export default Dropdown_listSong;