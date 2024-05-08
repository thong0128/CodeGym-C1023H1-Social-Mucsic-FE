import {Field, Form, Formik} from "formik";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import React, {useContext, useEffect, useState} from 'react';
import {storage} from "../FireBase/FirebaseConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {Modal} from "antd";
import {AppContext} from "../Context/AppContext";
export default function UpdateSong() {
    const [imageUrl, setImageUrl] = useState(undefined);
    const [songUrl, setSongUrl] = useState(undefined);
    const [songs,setSongs] = useState({});
    const [songTypes, setSongTypes] = useState([]);
    const [idUser, setIdUser] = useState(localStorage.getItem("idUser"));
    const idSong = useParams();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(true);
    const {toggleFlag} = useContext(AppContext);
    const [imgname, setImgname] = useState('');
    const [songname, setSongname] = useState('')


    const uploadFileImg = (image) => {
        if (image === null) return
        const imageRef = ref(storage, `IMG/${image.name}`);
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrl(url);
                setImgname(image.name);
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
                setSongname(music.name);
                console.log("song uploaded successfully", url);
                console.log("song uploaded successfully", songUrl);
                localStorage.setItem("song_url", url);
            });
        });
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        navigate("/showList")
    };

    useEffect(() => {
        axios.get("http://localhost:8080/songTypes").then((res)=>{
            setSongTypes(res.data)
        })
    }, []);


    useEffect(() => {
        axios.get("http://localhost:8080/songs/"+idSong.id).then((res)=>{
            console.log(res.data)
            setSongs(res.data)
        })
    }, [idSong]);

    return (
        <>
            <Modal width={1000} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <Formik initialValues={
                songs
            }
                    enableReinitialize={true}
                    onSubmit={(value) => {
                        if (localStorage.getItem("img_url") != null){
                            value.img_url = localStorage.getItem("img_url");
                        }
                        if (localStorage.getItem("song_url")!= null){
                            value.song_url = localStorage.getItem("song_url");
                        }
                        axios.put("http://localhost:8080/songs/user/update", value).then((res)=>{
                            toggleFlag();
                            toast.success(" Cập nhật hát thành công ", {
                                position: toast.POSITION.BOTTOM_RIGHT
                            })
                        })
                        setIsModalOpen(false);
                        navigate("/showList")

                    }}>
                <Form>
                    <div className="card">
                        <p className="card-header text-gray-800 text-xl">Cập nhật bài hát</p>
                        <div className="row align-items-center no-gutters">
                            <div className="col-md-5">
                                <img name="url_img"
                                     src={songs.img_url == null ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                         : songs.img_url}
                                     className="img-fluid" alt=""/>
                            </div>
                            <div className="col-md-7">
                                <div className="card-body">
                                    <div className="form-group mb-2">
                                        <label className="form-label uppercase" htmlFor="nameSong">Tên bài hát (<span
                                            className="text-danger">*</span>)</label>
                                        <Field name="title" type="text" id="nameSong" placeholder="Nhập tên bài hát"
                                               className="form-control text-f rounded-full"/>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="form-label uppercase" htmlFor="singer">Tên ca sĩ</label>
                                        <Field name="singer" type="text" id="singer" placeholder="Nhập tên ca sĩ"
                                               className="form-control text-f rounded-full"/>
                                    </div>

                                    <div className="form-group mb-2">
                                        <label className="form-label uppercase" htmlFor="album">Tên tác giả</label>
                                        <Field name="author" type="text" id="album" placeholder="Nhập tên tác giả"
                                               className="form-control text-f rounded-full"/>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="form-label uppercase" htmlFor="description">Mô tả</label>
                                        <Field name="description" component="textarea" id="description"
                                               placeholder="Nhập mô tả"
                                               className="form-control text-f rounded-full"/>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="form-label uppercase" htmlFor="type">Thể loại</label>
                                        <Field className="form-control form-control-sm text-f rounded-full" placeholder="Chọn thể loại"
                                               as="select" name="id_SongTypes.id" id="type">
                                            {songTypes.map((i, key) => {
                                                return (
                                                    <option key={key} value={i.id}>{i.name}</option>
                                                )
                                            })}
                                        </Field>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="form-label uppercase" htmlFor="album">Album</label>
                                        <Field name="album" type="text" id="album" placeholder="Album"
                                               className="form-control text-f rounded-full"/>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="form-label uppercase" htmlFor="url_img">Ảnh</label>
                                        <div className="row file-uploader">
                                            <label htmlFor="custom-file-upload1" className="col-md-8 filupp">
                                                <div className="wrapper">
                                                    <span className="text-f">Chọn ảnh</span>
                                                    <div className="file-upload">
                                                        {/*<input type="file"/>*/}
                                                        <input type="file" id="custom-file-upload1"
                                                               onChange={(event) => {
                                                                   uploadFileImg(event.target.files[0])
                                                               }}/>
                                                        <i className="fa fa-arrow-up"></i>
                                                    </div>
                                                    {imgname? imgname: null}
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="form-label uppercase" htmlFor="song_url">File nhạc</label>
                                        <div className="row file-uploader">
                                            <label htmlFor="custom-file-upload2" className="col-md-8 filupp text-f">
                                                <div className="wrapper">
                                                    <span className="text-f">Chọn tệp mp3</span>
                                                    <div className="file-upload">
                                                        {/*<input type="file"/>*/}
                                                        <input type="file"
                                                               id="custom-file-upload2" onChange={(event) => {
                                                            uploadFileSong(event.target.files[0])
                                                        }}/>
                                                        <i className="fa fa-arrow-up"></i>
                                                    </div>
                                                    {songname? songname : null}
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="my-4 text-center">
                                        <button type="submit" className="login100-form-btn w-30 m-auto h-12">Cập nhật
                                        </button>
                                        <button type="button" className="mt-2 text-base text-f"
                                                onClick={handleCancel}>Quay
                                            lại
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
            </Modal>
        </>
    )
}