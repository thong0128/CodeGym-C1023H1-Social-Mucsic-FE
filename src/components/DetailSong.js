import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {findSongById} from "../service/SongService";
import {useDispatch} from "react-redux";

export default function SongDetail (){
    const {id} = useParams()
    const [detailSong,setdetailSong] = useState({})
    const dispatch = useDispatch()
    const [commentList, setCommentList] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:8080/songs/"+id).then(res => {
            setdetailSong(res.data)
        }).catch(Error => console.log(Error))
    }, [])

    return(
        <>
            <div className="grid grid-cols-3 gap-4 h-screen">
                <div className="mx-3 mt-5">
                    {/*<h1 className={'font-bold flex items-center justify-center mb-5 mt-5 text-white text-3xl font-sans'}*/}
                    {/*    style={{color: "white"}}>Song Detail</h1>*/}
                        <div className="flex justify-center">
                            <img style={{width: 350, height: 350}} onClick={() => {
                                dispatch(findSongById(id))
                            }} src={detailSong.img_url}/>
                        </div>
                        <div className={'flex flex-col justify-center text-white ml-4 mt-4'}>
                            <div className="text-center"><span className="text-white text-2xl font-sans">{detailSong.title}</span></div>
                            <div className="text-center text">
                                <p className="mb-2 mt-2 text-slate-400 group-hover:text-black text-sm">Singer: {detailSong.singer}</p>
                                <p className="mb-2 mt-2 text-slate-400 group-hover:text-black text-sm">Composer: {detailSong.author}</p>
                            </div>
                            {/*<div className="text-center text-gray-400">Tác giả: {detailSong.author}</div>*/}
                            {/*<div>Lời tựa : {detailSong.description}</div>*/}
                        </div>
                </div>
                <div className="col-span-2 mt-5 mx-3 pt-6 justify-center">
                    <form className="w-8/12 mx-auto">
                        <div className="mb-4 border border-gray-200 rounded-lg bg-gray-500 dark:bg-gray-700 dark:border-gray-600">
                            <div className="px-4 py-2 bg-[#DDE4E4] rounded-t-lg">
                                <label htmlFor="comment" className="sr-only">Your comment</label>
                                <textarea id="comment" rows="4"
                                          className="w-full px-0 text-sm text-gray-600 bg-[#DDE4E4] border-0 focus:ring-0 dark:text-gray-600 dark:placeholder-gray-500"
                                          placeholder="Write a comment..." required></textarea>
                            </div>
                            <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                <button className="login100-form-btn w-52">
                                    Post comment
                                </button>
                                <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                                    <button type="button"
                                            className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                             fill="none" viewBox="0 0 12 20">
                                            <path stroke="currentColor" stroke-linejoin="round" stroke-width="2"
                                                  d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"/>
                                        </svg>
                                        <span className="sr-only">Attach file</span>
                                    </button>
                                    <button type="button"
                                            className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                             fill="currentColor" viewBox="0 0 20 18">
                                            <path
                                                d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                        </svg>
                                        <span className="sr-only">Upload image</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="w-8/12 text-white mx-auto">
                        {commentList?.map((item)=>(
                            <div>
                                <h1>comment1</h1>
                            </div>

                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}
