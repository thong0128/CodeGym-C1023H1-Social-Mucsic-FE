import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {findSongById} from "../service/SongService";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {AppContext} from "../Context/AppContext";
import {MdClear} from "react-icons/md";

export default function SongDetail (){
    const {id} = useParams()
    const {isFlag, toggleFlag} = useContext(AppContext);
    const [detailSong,setDetailSong] = useState({})
    const dispatch = useDispatch()
    const [commentList, setCommentList] = useState([])
    const [comment, setComment] = useState({})
    let userId = localStorage.getItem("idUser");
    useEffect(()=>{
        axios.get("http://localhost:8080/songs/"+id).then(res => {
            setDetailSong(res.data)
        }).catch(Error => console.log(Error))
    }, [])
    useEffect(()=>{
        axios.get("http://localhost:8080/comments/"+id).then(res => {
            setCommentList(res.data)
        }).catch(Error => console.log(Error))
    }, [isFlag])

    const formik = useFormik({
        initialValues: {comment},
        onSubmit: (values) => {
            axios.post(` http://localhost:8080/comments/create/${userId}/${id}`, values).then(
                res => {
                    // alert("Them moi thanh cong!!!");
                    console.log(values);
                    document.getElementById("comment").value = '';
                    toggleFlag();
                })
        }
    })
    const handleDeleteComment = (cid)=>{
        axios.delete(` http://localhost:8080/comments/delete/${cid}`).then(
            res => {
                toggleFlag();
            })
    }

    return(
        <>
            <div className="grid grid-cols-3 gap-4 h-screen">
                <div className="mx-3 mt-5">
                        <div className="flex justify-center rounded-xl">
                            <img className="rounded-xl shadow-2xl" style={{width: 350, height: 350}} onClick={() => {
                                dispatch(findSongById(id))
                            }} src={detailSong.img_url}/>
                        </div>
                        <div className={'flex flex-col justify-center text-white ml-4 mt-4'}>
                            <div className="text-center"><span className="text-white text-2xl font-sans">{detailSong.title}</span></div>
                            <div className="text-center text">
                                <p className="mb-2 mt-2 text-slate-400 group-hover:text-black text-sm text-f">Singer: {detailSong.singer}</p>
                                <p className="mb-2 mt-2 text-slate-400 group-hover:text-black text-sm text-f">Composer: {detailSong.author}</p>
                            </div>
                        </div>
                </div>
                <div className="col-span-2 mt-5 mx-3 pt-6 justify-center rounded-xl">
                    <div className="w-8/12 text-white mx-auto">
                        {commentList.length>0?
                            <div className="bg-[#8c4bae] p-6 bg-opacity-10  rounded-xl ">
                            <h2 className="text-lg font-bold mb-4 text-white text-f">Comments</h2>
                            {commentList?.map((item) => (
                                <div className="flex flex-col space-y-4 mb-2">
                                    <div className="bg-[#DDE4E4] p-3 rounded-xl shadow-md">
                                        <div className="flex flex-row space-y-4 mb-2">
                                            <h3 className="flex-grow text-gray-700 text-lg font-bold text-f">{item.user.userName}</h3>
                                            {item.user.id == userId?    <MdClear size={20} className="text-gray-400 m-0" style={{display: "block"}} onClick={()=>{handleDeleteComment(item.id)}}/> :
                                                <MdClear size={20} className="text-gray-400 m-0" style={{display: "none"}}/>}

                                        </div>
                                        <p className="text-gray-700 text-xs mb-2 text-f">Posted on {item.createDate.substring(0, 19)}</p>
                                        <p className="text-gray-700 text-base text-f">{item.textCom}</p>
                                    </div>
                                </div>
                            ))}
                             </div> :
                            <div></div>
                        }

                    </div>
                    {userId ?
                        <form className="w-8/12 mx-auto rounded-xl bg-[#8c4bae] bg-opacity-10 mt-4 px-4 py-4 "
                              onSubmit={formik.handleSubmit}>
                            <div className="rounded-t-lg mb-2">
                                <label htmlFor="comment" className="sr-only text-f">Your comment</label>
                                <textarea id="comment" rows="4"
                                          className="text-f w-full px-0 text-sm text-gray-600 bg-[#DDE4E4] rounded-xl focus:ring-0 dark:text-gray-600 dark:placeholder-gray-500 p-2"
                                          placeholder="Write a comment..." required
                                          name={"textCom"}
                                          value={formik.values.comment.textCom}
                                          onInput={formik.handleChange}
                                >
                            </textarea>
                            </div>
                            <button className="login100-form-btn w-[100px] h-[30px] rounded-full uppercase" type={"submit"}>
                                Post
                            </button>
                        </form> :
                        <div>
                        </div>
                    }

                </div>

            </div>
        </>
    )
}
