import React, {useEffect, useState} from 'react';
import {Modal} from 'antd';
import {Field, Form, Formik} from "formik";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {storage} from "../FireBase/FirebaseConfig"
import axios from "axios";
import {useDispatch} from "react-redux";
import * as actions from "../store/actions";

const ModalCreateSong = () => {
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState(undefined);
    const [songUrl, setSongUrl] = useState(undefined);
    const [songs,setSongs] = useState({});
    const [songTypes, setSongTypes] = useState([]);
    const navigate = useNavigate();
    const uploadFileImg = (image) => {
        if (image === null) return
        const imageRef = ref(storage, `IMG/${image.name}`);
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrl(url);
                console.log("image uploaded successfully", url);
                console.log("image uploaded successfully", imageUrl);
                songs.img_url = url;
                localStorage.setItem("img_url", url);
            });
        });
    };

    const uploadFileSong = (music) => {
        if (music === null) return
        const urlRef = ref(storage, `Music/${music.name}`);
        uploadBytes(urlRef, music).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setSongUrl(url);
                console.log("song uploaded successfully", url);
                console.log("song uploaded successfully", songUrl);
                songs.song_url = url;
                localStorage.setItem("song_url", url);
            });
        });
    };

    useEffect(() => {
        axios.get("http://localhost:8080/songTypes").then((res)=>{
            setSongTypes(res.data)
        })
    }, []);

    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(true);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const  handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        navigate("/")
    };


    return (
        <>
            <Modal width={1000} title="Tạo bài hát mới" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Formik initialValues={{
                    title: "",
                    description:"",
                    img_url: "",
                    song_url: "",
                    author: "",
                    singer: "",
                    album:"",
                    songTypes:{
                        id: ""
                    },
                    appUser: {
                        id:""
                    }
                }} onSubmit={(value) => {
                    value.img_url = localStorage.getItem("img_url");
                    value.song_url = localStorage.getItem("song_url");
                    value.appUser.id = localStorage.getItem("idUser")
                    if (value.songTypes.id === ""){
                        value.songTypes.id = 1
                    }
                    console.log("idSOngtype: ", value)
                    axios.post("http://localhost:8080/songs/user/create", value).then((res)=>{
                        console.log(res.data)
                        toast.success("Tạo bài hát thành công", {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                        dispatch(actions.getHome()); // Cập nhật lại danh sách bài hát mới
                    })
                }}>
                    <Form>
                        <div className="card">
                            <div className="row align-items-center no-gutters">
                                <div className="col-md-5">
                                    <img name="url_img"
                                         src= {songs.url_img == null? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                             : songs.url_img}
                                         className="img-fluid" alt=""/>
                                </div>
                                <div className="col-md-7">
                                    <div className="card-body">
                                        <div className="form-group mb-2">
                                            <label className="form-label" htmlFor="nameSong">Tên bài hát (<span className="text-danger">*</span>)</label>
                                            <Field name="title" type="text" id="nameSong" placeholder="Nhập tên bài hát"
                                                   className="form-control"/>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label className="form-label" htmlFor="singer">Tên ca sĩ</label>
                                            <Field name="singer" type="text" id="singer" placeholder="Nhập tên ca sĩ"
                                                   className="form-control"/>
                                        </div>

                                        <div className="form-group mb-2">
                                            <label className="form-label" htmlFor="album">Tên tác giả</label>
                                            <Field name="author" type="text" id="album" placeholder="Nhập tên tác giả"
                                                   className="form-control"/>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label className="form-label" htmlFor="description">Mô tả</label>
                                            <Field name="description" component="textarea" id="description" placeholder="Nhập mô tả"
                                                   className="form-control"/>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label className="form-label" htmlFor="type">Thể loại</label>
                                            <Field className="form-control form-control-sm" placeholder="Chọn thể loại"
                                                   as="select" name="id_SongTypes.id" id="type">
                                                {songTypes.map((i, key) => {
                                                    return (
                                                        <option key={key} value={i.id}>{i.name}</option>
                                                    )
                                                })}
                                            </Field>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label className="form-label" htmlFor="album">Album</label>
                                            <Field name="album" type="text" id="album" placeholder="Album"
                                                   className="form-control"/>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label className="form-label" htmlFor="img_url">Ảnh</label>
                                            <input type="file" id="img_url" className="form-control" onChange={(event)=>{
                                                uploadFileImg(event.target.files[0])
                                            }}/>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label className="form-label" htmlFor="song_url">File nhạc</label>
                                            <input type="file" id="song_url" className="form-control" onChange={(event)=>{
                                                uploadFileSong(event.target.files[0])
                                            }}/>
                                        </div>
                                        <div className="my-4 text-center">
                                            <button type="button" className="btn btn-default" onClick={handleCancel}>Quay lại</button>
                                            <button type="submit" className="btn btn-primary">Tạo bài hát</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </Modal>
        </>
    );
};

export default ModalCreateSong;
