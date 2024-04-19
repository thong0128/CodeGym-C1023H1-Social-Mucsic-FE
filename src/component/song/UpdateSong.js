import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Field, Form, Formik} from "formik";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../fireBase/FirebaseConfig";
import './createSong.css'

export function UpdateSong() {
    const idSong = useParams();
    const [songs, setSongs] = useState({})
    const [imageUrl, setImageUrl] = useState(undefined);
    const [songUrl, setSongUrl] = useState(undefined);
    const [songType, setSongTypes] = useState([]);
    const [idUser, setIdUser] = useState(localStorage.getItem("idUser"));

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
                setSongUrl(url); // Lưu URL sau khi upload thành công vào state mới
                console.log("song uploaded successfully", url);
                console.log("song uploaded successfully", songUrl);
                songs.song_url = url;
                localStorage.setItem("song_url", url);
            });
        });
    };

    useEffect(() => {
        axios.get("http://localhost:8080/songs/"+idSong.id).then((res)=>{
            setSongs(res.data)
        })
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8080/songTypes").then((res)=>{
            setSongTypes(res.data)
        })
    }, []);

    return (
        <>
            <Formik initialValues={{
                id:idSong.id,
                title: songs.title,
                description: songs.description,
                img_url: songs.img_url,
                song_url: songs.song_url,
                author: songs.author,
                singer: songs.singer,
                album:songs.album,
                songTypes:songs.songTypes,
                appUser: {
                    id:idUser
                }
            }}
                    enableReinitialize={true}
                    onSubmit={(value) => {
                value.img_url = localStorage.getItem("url_img");
                value.song_url = localStorage.getItem("url_song");
                axios.put("http://localhost:8080/songs", value).then((res)=>{
                    console.log(res.data)
                })
            }}>
                <Form>
                    <div className={"createSong"}>
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
                                   as="select" name="songTypes.id" id="type">
                                {songType.map((i, key) => {
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
                            <label className="form-label" htmlFor="url_img">Ảnh</label>
                            <input type="file" id="url_img" className="form-control" onChange={(event)=>{
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
                            <button type="submit" className="btn btn-primary">Cập nhật bài hát</button>
                        </div>
                    </div>
                </Form>
            </Formik>

        </>
    )



}