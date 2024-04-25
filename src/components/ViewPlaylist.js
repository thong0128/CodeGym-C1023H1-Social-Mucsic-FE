import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import {toast} from "react-toastify";
import {IoAddOutline} from "react-icons/io5";
import {MdDeleteOutline, MdOutlineBrowserUpdated} from "react-icons/md";

function ViewPlaylist(props) {
    const navigate = useNavigate();
    const idPlaylist = useParams();
    const [listSong, setListSong] = useState([])
    const [playList, setPlayList] = useState({})
    // useEffect(() => {
    //     axios.get("http://localhost:8080/songs/searchByIdPll/" + idPlaylist.id).then((res)=>{
    //         setListSong(res.data);
    //         console.log("lít r: ", listSong)
    //     })
    // },[listSong]);

    // useEffect(() => {
    //     axios.get("http://localhost:8080/playLists/" + idPlaylist.id).then((res)=>{
    //         setPlayList(res.data);
    //     })
    // }, []);

    function deleteSong(idSong, idPlaylist) {
        axios.delete("http://localhost:8080/playLists/deleteSongInPlaylist/" + idSong + "/" + idPlaylist).then((res)=>{
            toast.success("Bạn vừa xóa 1 bài hát ra khỏi D/S", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }
    return (
        <>
            <div style={{color:"white", marginTop:30}}>
                <div className="name_playlist" style={{paddingBottom:20, fontSize: 30, paddingLeft:10}}>
                    Danh sách bài hát của: {playList.namePlayList}
                </div>
                <table className="table" style={{color:"white"}}>
                    <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên bài hát</th>
                        <th scope="col">Tên ca sĩ</th>
                        <th scope="col">Tên nhạc sĩ</th>
                        <th scope="col">Ảnh</th>
                        <th scope="col" colSpan={2}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {listSong.map((i, key)=> {
                        return (
                            <tr>
                                <th scope="row">{i.id}</th>
                                <td onClick={()=>{
                                    navigate("/detailSong/" + i.id)
                                }}>{i.nameSong}</td>
                                <td>{i.singer}</td>
                                <td>{i.author}</td>
                                <td><img src={i.url_img} style={{width:50, height:50}}/></td>
                                <td><MdDeleteOutline onClick={()=>{
                                    deleteSong(i.id, idPlaylist.id);
                                }} style={{width:30, height:30}}/></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ViewPlaylist;