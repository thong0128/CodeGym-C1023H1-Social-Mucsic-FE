import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import {toast} from "react-toastify";
import {IoAddOutline} from "react-icons/io5";
import {MdDeleteOutline, MdOutlineBrowserUpdated} from "react-icons/md";
import {FaEye} from "react-icons/fa";
import {findSongById} from "../service/SongService";
import {useDispatch} from "react-redux";

function ViewPlaylist(props) {
    const navigate = useNavigate();
    const [listSong, setListSOng] = useState([]);
    const idType = useParams()
    const [type, setType] = useState({})
    const dispatch = useDispatch()
    // useEffect(() => {
    //     axios.get("http://localhost:8080/songs/showListSongByType/" + idType.id).then((res) =>{
    //         if (res.data === []){
    //             toast.success("Danh sách chưa có bài hát")
    //         } else {
    //             setListSOng(res.data)
    //         }
    //     }).catch(() => {
    //         toast.error('bux')
    //     })
    // }, []);
    const songTypes ={}
    // useEffect(() => {
    //     axios.get("http://localhost:8080/songTypes/" + idType.id).then((res) =>{
    //         setType(res.data)
    //     })
    // }, []);
    useEffect(() => {
        setType(songTypes)
    }, []);
    return (
        <>
            <div style={{color:"white", marginTop:30}}>
                <div className="name_playlist" style={{paddingBottom:20, fontSize: 30, paddingLeft:10}}>
                    Danh sách bài hát của: {type.name}
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
                                <td  onClick={()=>{
                                    dispatch(findSongById(i.id))
                                }}>{i.nameSong}</td>
                                <td>{i.singer}</td>
                                <td>{i.author}</td>
                                <td><img src={i.url_img} style={{width:50, height:50}}/></td>
                                <td><FaEye onClick={() => {
                                    navigate("/detailSong/"+ i.id)
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