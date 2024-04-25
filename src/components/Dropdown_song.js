import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../Context/AppContext";
import {Button, Dropdown} from "antd";
import {AiOutlineMore} from "react-icons/ai";
import {toast} from "react-toastify";


function DropdownSong({idSong}) {

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
    ];
    return (
        <>
            <Dropdown
                menu={{
                    items,
                }}
                placement="top"
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

}

export default DropdownSong;