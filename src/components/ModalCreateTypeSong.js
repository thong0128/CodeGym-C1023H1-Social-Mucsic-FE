import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {AppContext} from "../Context/AppContext";
import axios from "axios";
import {Button, Modal} from "antd";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../FireBase/FirebaseConfig";

function ModalCreateTypeSong(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imgTypeSong, setImgTypeSOng] = useState("")
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const navigate = useNavigate();
    const id_user = localStorage.getItem("idUser")
    const [listPlaylistCheck, setPlaylistCheck] = useState([]);
    const {isFlag} = useContext(AppContext);
    const {toggleFlag} = useContext(AppContext);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(undefined);

    // useEffect(() => {
    //     axios.get('http://localhost:8080/playLists').then(res => {
    //         setPlaylistCheck(findPlaylist(res.data));
    //     })
    // }, [isFlag]);

    const playLists = {}

    useEffect(() => {
        setPlaylistCheck(playLists)
    }, [isFlag]);

    function findPlaylist(data) {
        let a = [];
        for (let i = 0; i < data.length; i++) {
            a.push(data[i].namePlayList)
        }
        return a;
    }

    const uploadFileImg = (image) => {
        if (image === null) return
        const imageRef = ref(storage, `IMG_ZingMP3/${image.name}`);
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setUploadedImageUrl(url); // Lưu URL sau khi upload thành công vào state mới
                console.log("image uploaded successfully", url);
                console.log("image uploaded successfully", uploadedImageUrl);
                setImgTypeSOng(url)
                localStorage.setItem("imgTypeSong", url)
            });
        });
    };

    return (
        <>
            <Button style={{backgroundColor:"rgba(255, 0, 0, 0.5)"}} type="primary" onClick={showModal}>
                Thêm Loại nhạc
            </Button>
            <Modal title="Tạo thêm loại nhạc" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Formik initialValues={{
                    name: "",
                    url_img: ""
                }}
                        // validationSchema={
                        //     require("yup").object().shape({
                        //         name: require("yup")
                        //             .string()
                        //             .matches(/^[a-zA-Z0-9_]+$/, "Tên không hợp lệ")
                        //             .required("Vui lòng nhập tên Playlist").test('unique', 'Playlist đã tồn tại', (value) => {
                        //                 return !listPlaylistCheck.includes(value);
                        //             }),
                        //     })
                        // }
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            values.url_img = localStorage.getItem("imgTypeSong")
                            axios.put("http://localhost:8080/songTypes", values).then((res) => {
                                console.log("sdasdasdádas")
                                if (res.data === false) {
                                    toast.error('Không thể tạo')
                                }
                                toast.success("Tạo thành công", {
                                    position: toast.POSITION.BOTTOM_RIGHT
                                })
                                toggleFlag()
                            })
                        }}>
                    <Form>
                        <div className="row g-3 align-items-center"
                             style={{width: 400, marginLeft: 20, display: 'align-items-center'}}>
                            <div className="col-auto">
                                <label htmlFor="inputPassword6" className="col-form-label"></label>
                            </div>
                            <div className="col-auto">
                                <h5>Tên loại</h5>
                                <ErrorMessage style={{color: 'red'}} className={'formik-error-message'}
                                              name="namePlayList" component="div"/>
                                <Field name="name" type="text" id="input" className="form-control"
                                       aria-describedby="passwordHelpInline"/><br/>
                                <label className="form-label" htmlFor="file_song">Ảnh</label>
                                <input type="file" id="file_song" className="form-control" onChange={(event) => {
                                    uploadFileImg(event.target.files[0])
                                }}/>
                                <div className="col-auto">
                                    <button type="submit" className="btn btn-primary">Thêm</button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </Modal>
        </>
    );
}
export default ModalCreateTypeSong;