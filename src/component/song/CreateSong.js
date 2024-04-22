import {getDownloadURL,ref,uploadBytes} from "firebase/storage";
import {storage} from '../../fireBase/FirebaseConfig';
import {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import './display.css'
import {Modal} from "antd";
export function CreateSong() {
    const [songs,setSongs] = useState({})
    const [imageUrl, setImageUrl] = useState(undefined);
    const [songUrl, setSongUrl] = useState(undefined);
    const [songType, setSongTypes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const uploadFileImg = (image) => {
        if (image === null) return
        const imageRef = ref(storage, `IMG/${image.name}`);
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrl(url); // Lưu URL sau khi upload thành công vào state mới
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
                setSongUrl(url); // Lưu URL sau khi upload thành công vào state mới
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

    const token = localStorage.getItem('token'); // Lấy token từ Local Storage

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Thêm token vào Authorization header
        }
    };
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal width={900} title="Tạo bài hát mới" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                   footer={null}>
                <Formik initialValues={{
                    title: "",
                    description:"",
                    img_url: "",
                    song_url: "",
                    author: "",
                    singer: "",
                    album:"",
                    songTypes:{
                        id: "1"
                    },
                    appUser: {
                        id:""
                    }
                }} onSubmit={(value) => {
                    value.img_url = localStorage.getItem("img_url");
                    value.song_url = localStorage.getItem("song_url");
                    value.appUser.id = localStorage.getItem("idUser")
                    axios.post("http://localhost:8080/songs/user/create", value,config).then((res)=>{
                        console.log(res.data)
                    })
                }}>
                    <Form>
                        <div className="card">
                            <div className="row align-items-center no-gutters">
                                <div className="col-md-5 upload-img">
                                    <label htmlFor="url_img" className="custom-file-upload fas">
                                        <div className="img-wrap img-upload">
                                            {songs.img_url == null ? <img
                                                    src="https://d1j8r0kxyu9tj8.cloudfront.net/images/1533455616Z5Gtl4oKo0qM1E9.jpg"
                                                    className="img-fluid" alt="img_song"/> :
                                                <img src={songs.img_url}
                                                     alt="img_song" className="img-fluid"/>}
                                        </div>
                                        <input id="url_img" type="file" onChange={(event) => {
                                            uploadFileImg(event.target.files[0])
                                        }}/>
                                    </label>
                                </div>
                                <div className="col-md-7">
                                    <div className="card-body">
                                        <div className="form-group mb-2">
                                            <label className="form-label" htmlFor="nameSong">Tên bài hát(<span
                                                className="text-danger">*</span>)</label>
                                            <div className="input-field"><span className="fas fa-music p-2"></span>
                                                <Field name="title" type="text" id="nameSong" placeholder="Nhập tên bài hát"
                                                       className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label className="form-label" htmlFor="singer">Tên ca sĩ (<span
                                                className="text-danger">*</span>)</label>
                                            <div className="input-field"><span className="fas fa-microphone-alt p-2"></span>
                                                <Field name="singer" type="text" id="singer" placeholder="Nhập tên ca sĩ"
                                                       className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label className="form-label" htmlFor="author">Tên tác giả (<span
                                                className="text-danger">*</span>)</label>
                                            <div className="input-field"><span className="fas fa-user p-2"></span>
                                                <Field name="author" type="text" id="author" placeholder="Nhập tên tác giả"
                                                       className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label className="form-label" htmlFor="description">Mô tả(<span
                                                className="text-danger">*</span>)</label>
                                            <div className="input-field"><span className="fas fa-pen p-2"></span>
                                                <Field name="description" component="textarea" id="description" placeholder="Nhập mô tả"
                                                       className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label className="form-label" htmlFor="type">Thể loại(<span
                                                className="text-danger">*</span>)</label>
                                            <Field className="input-field" placeholder="Chọn thể loại"
                                                   as="select" name="songTypes.id" id="type">
                                                {songType.map((i, key) => {
                                                    return (
                                                        <option key={key} value={i.id}>{i.name}</option>
                                                    )
                                                })}
                                            </Field>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label className="form-label" htmlFor="author">Album (<span
                                                className="text-danger">*</span>)</label>
                                            <div className="input-field"><span className="fas fa-record-vinyl p-2"></span>
                                                <Field name="album" type="text" id="albumr" placeholder="Album"
                                                       className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label className="form-label" htmlFor="song_url">File nhạc</label>
                                            <div className="input-field"><span className="fas fa p-2"></span>
                                            <input type="file" id="song_url" className="form-control" onChange={(event)=>{
                                                uploadFileSong(event.target.files[0])
                                            }}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-4 text-center">
                                <button type="submit" className="btn btn-primary">Tạo bài hát</button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </Modal>
        </>
    )
}