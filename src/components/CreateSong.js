import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'antd';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";
import {storage} from "../FireBase/FirebaseConfig";
import axios from "axios";
import {useDispatch} from "react-redux";
import * as actions from "../store/actions";

const ModalCreateSong = () => {
    const dispatch = useDispatch();
    const [uploadedImageUrl, setUploadedImageUrl] = useState(undefined);
    const [uploadedSong, setUploadedSong] = useState()
    const [songsUrl, setSongsUrl] = useState(null);
    const [image, setImage] = useState();
    const [songs,setSongs] = useState({})
    const [songType, setSongType] = useState([])
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
    // }, []);
    const data = {};
    useEffect(() => {
        setSongType(data)
    }, []);

    const uploadFileSong = (url) => {
        if (url === null) return
        const urlRef = ref(storage, `ZingMusic/${url.name}`);
        uploadBytes(urlRef, url).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setUploadedImageUrl(url); // Lưu URL sau khi upload thành công vào state mới
                console.log("image uploaded successfully", url);
                console.log("image uploaded successfully", uploadedImageUrl);
                songs.url_img = url;
                localStorage.setItem("url_song", url);
            });
        });
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
    const navigate = useNavigate();
    const id_user = localStorage.getItem("idUser")
    const [listPlaylistCheck, setPlaylistCheck] = useState([]);

    // useEffect(() => {
    //     axios.get('http://localhost:8080/playLists').then(res => {
    //         setPlaylistCheck(findPlaylist(res.data)) ;
    //     })
    // }, []);
    const playLists = {}
    useEffect(() => {
        setPlaylistCheck(playLists)
    }, []);
    function findPlaylist (data) {
        let a = [];
        for (let i = 0; i < data.length; i++) {
            a.push(data[i].namePlayList)
        }
        return a;
    }
    return (
        <>
            <Modal width={1000} title="Tạo bài hát mới" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Formik initialValues={{
                    nameSong: "",
                    singer: "",
                    author: "",
                    url_img: "",
                    description: "",
                    file_song: "",
                    user: {
                        id: ""
                    },
                    id_SongTypes:{
                        id: ""
                    }
                }} onSubmit={(value) => {
                    value.url_img = localStorage.getItem("url_img");
                    value.file_song = localStorage.getItem("url_song");
                    value.user.id = localStorage.getItem("idUser");
                    if (value.id_SongTypes.id === ""){
                        value.id_SongTypes.id = 1
                    }
                    console.log("idSOngtype: ", value)
                    axios.post("http://localhost:8080/songs", value).then((res)=>{
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
