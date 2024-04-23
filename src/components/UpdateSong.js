import {Field, Form, Formik} from "formik";
import {
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";
import React, {useEffect, useState} from 'react';
import {storage} from "../FireBase/FirebaseConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
export default function UpdateSong(prop) {
    const [uploadedImageUrl, setUploadedImageUrl] = useState(undefined);
    const [uploadedSong, setUploadedSong] = useState()
    const [songsUrl, setSongsUrl] = useState(null);
    const [image, setImage] = useState();
    const [songs,setSongs] = useState({})
    const [songType, setSongType] = useState([])
    const idSong = useParams();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [idUser, setIdUser] = useState(localStorage.getItem("idUser"))

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

    const uploadFileImg = (image) => {
        if (image === null) return
        const imageRef = ref(storage, `IMG_ZingMP3/${image.name}`);
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setUploadedImageUrl(url); // Lưu URL sau khi upload thành công vào state mới
                console.log("image uploaded successfully", url);
                console.log("image uploaded successfully", uploadedImageUrl);
                songs.url_img = url;
                localStorage.setItem("url_img", url);
            });
        });
    };
    // useEffect(() => {
    //     axios.get("http://localhost:8080/songTypes").then((res)=>{
    //         setSongType(res.data);
    //     })
    //
    // }, []);
    const songTypes = {}
    useEffect(() => {
        setSongType(songTypes)
    }, []);


    // useEffect(()=>{
    //     console.log("id: ", idSong.id)
    //     axios.get("http://localhost:8080/songs/" + idSong.id).then((res)=>{
    //         setSongs(res.data);
    //     })
    // },[])

    const songs1 = {}
    useEffect(() => {
        setSongs(songs1)
    }, []);

    const uploadFileSong = (url) => {
        if (url === null) return
        const urlRef = ref(storage, `ZingMusic/${url.name}`);
        uploadBytes(urlRef, url).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setUploadedImageUrl(url); // Lưu URL sau khi upload thành công vào state mới
                songs.url_img = url;
                localStorage.setItem("url_song", url);
            });
        });
    };
    return (
        <>
            <Formik initialValues={{
                id: idSong.id,
                nameSong: songs.nameSong,
                singer: songs.singer,
                author: songs.author,
                description: songs.description,
                id_SongTypes: songs.id_SongTypes,
                file_song: songs.file_song,
                user: {
                    id: idUser
                }
            }}
                    enableReinitialize={true}
                    onSubmit={(value) => {
                value.url_img = localStorage.getItem("url_img");
                value.file_song = localStorage.getItem("url_song");
                value.user.id = idUser;
                        console.log("xxxx",value)
                axios.put("http://localhost:8080/songs", value).then((res)=>{
                    toast.success(" Cập nhật hát thành công ", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                })
            }}>
                <Form>
                    <div className="card">
                        <div className="row align-items-center no-gutters">
                            <div className="col-md-5">
                                <img name="url_img"
                                     src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                     className="img-fluid" alt=""/>
                            </div>
                            <div className="col-md-7">
                                <div className="card-body">
                                    <div className="form-group mb-2">
                                        <label className="form-label" htmlFor="nameSong">Tên bài hát (<span className="text-danger">*</span>)</label>
                                        <Field name="nameSong" type="text" id="nameSong" placeholder="Nhập tên bài hát"
                                               className="form-control"/>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="form-label" htmlFor="singer">Tên ca sĩ</label>
                                        <Field name="singer" type="text" id="singer" placeholder="Nhập tên ca sĩ"
                                               className="form-control"/>
                                    </div>

                                    <div className="form-group mb-2">
                                        <label className="form-label" htmlFor="author">Tên tác giả</label>
                                        <Field name="author" type="text" id="author" placeholder="Nhập tên tác giả"
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
                                            {songType.map((i, key) => {
                                                return (
                                                    <option key={key} value={i.id}>{i.name}</option>
                                                )
                                            })}
                                        </Field>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="form-label" htmlFor="url_img">Ảnh</label>
                                        <input type="file" id="url_img" className="form-control" onChange={(event)=>{
                                            uploadFileImg(event.target.files[0])
                                        }}/>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="form-label" htmlFor="file_song">File nhạc</label>
                                        <input type="file" id="file_song" className="form-control" onChange={(event)=>{
                                            uploadFileSong(event.target.files[0])
                                            console.log("file nhạc ", event.target.files[0]);
                                        }}/>
                                    </div>

                                    <div className="my-4 text-center">
                                        <button type="button" className="btn btn-default" onClick={handleCancel}>Quay lại</button>
                                        <button type="submit" className="btn btn-primary">Cập nhật bài hát</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    )
}