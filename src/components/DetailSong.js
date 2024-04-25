import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {findSongById} from "../service/SongService";
import {useDispatch} from "react-redux";

export default function SongDetail (){
    const {id} = useParams()
    const [detailSong,setdetailSong] = useState({})
    const dispatch = useDispatch()
    // useEffect(()=>{
    //     axios.get("http://localhost:8080/songs/"+id).then(res => {
    //         setdetailSong(res.data)
    //     }).catch(Error => console.log(Error))
    // }, [])

    return(
        <>
            <h1 className={'font-bold flex items-center justify-center mb-5 mt-5 text-white'} style={{color:"white"}}>Song Detail</h1>
           <div className={'flex justify-center items-center'}>
               <img style={{width: 350, height:350}} onClick={() =>{
                   dispatch(findSongById(id))
               }} src={detailSong.url_img} />
               <div className={'flex flex-col text-white ml-4'}>
                   <div>Tên bài hát: {detailSong.nameSong}</div>
                   <div>Ca sĩ: {detailSong.singer}</div>
                   <div>Tác giả: {detailSong.author}</div>
                   <div>Lời tựa : {detailSong.description}</div>
               </div>
           </div>

        </>
    )
}
