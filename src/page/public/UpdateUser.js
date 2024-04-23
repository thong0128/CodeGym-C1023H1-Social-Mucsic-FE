
import {Field, Form, Formik} from "formik";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {storage} from "../../FireBase/FireBaseConfig";
import {
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";
import React from 'react';
import {Button, Modal, notification, Space} from 'antd';
import {AppContext} from "../../Context/AppContext";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export default function UpdateUser() {
    const navigate = useNavigate()
    const {toggleFlag} = useContext(AppContext);
    const id = localStorage.getItem("idUser")
    const [user, setUser] = useState({})
    const [uploadedImageUrl, setUploadedImageUrl] = useState(undefined);
    const [image, setImage] = useState(null);
    const [api, contextHolder] = notification.useNotification();
    const [isModalOpen, setIsModalOpen] = useState(true);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // useEffect(() => {
    //     if(id != null) {
    //         axios.get('http://localhost:8080/users/' + id).then((res) => {
    //             console.log(res.data)
    //             setUser(res.data)
    //         })
    //     }
    // }, [])
    const users1 = {}
    useEffect(() => {
        setUser(users1)
    }, []);

    const uploadFile = (image, id_user) => {
        if (image === null) return
        const imageRef = ref(storage, `IMG-ZingMP3/${image.name}`);
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setUploadedImageUrl(url); // Lưu URL sau khi upload thành công vào state mới
                console.log("image uploaded successfully", url);
                console.log("image uploaded successfully", uploadedImageUrl);
                user.url_img = url;
                if (id != null){
                    axios.put("http://localhost:8080/users/" + id, user).then((res) => {
                        toast.success("Đã thêm ảnh thành công")
                    })
                }
            });
        });
    };

    const openNotificationWithIcon = (title, desc) => {
        console.log(title, desc);
        api.success({
            message: title,
            description: desc,
            placement: 'top'
        });
    };
    if (id != null){
        return (
            <>
                <Modal width={1000} title="Tạo bài hát mới" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                       footer={null}>
                    <Formik
                        initialValues={{
                            userName: user.userName,
                            email: user.email,
                            phone: user.phone,
                            url_img: user.url_img,
                            dayOfBirth: user.dayOfBirth
                        }}
                        enableReinitialize={true}
                        onSubmit={(user1) => {
                            axios.put("http://localhost:8080/users/" + id, user1).then((res) => {
                                localStorage.setItem("user", res.data.username)
                                toast.success("Cập nhật thành công")
                                navigate("/")
                            }).catch(() => {
                                toast.error("Cập nhật không thành công")
                            })
                            toggleFlag()
                        }}
                    >
                        <Form>
                            <div className="card">
                                <div className="row align-items-center no-gutters">
                                    <div className="col-md-5">
                                        {user.url_img == null ? <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                                alt="login form" className="img-fluid"/> :
                                            <img src={user.url_img}
                                                 alt="login form" className="img-fluid" style={{
                                                width: 400,
                                                height: 360,
                                                marginTop: -12,
                                                paddingLeft: 20
                                            }}/>}
                                    </div>
                                    <div className="col-md-7">
                                        <div className="card-body">
                                            <div className="form-group mb-2">
                                                <label className="form-label" htmlFor="email">Địa chỉ email (<span className="text-danger">*</span>)</label>
                                                <Field name="email" type="email" id="email" placeholder="Nhập Email của bạn"
                                                       className="form-control"/>
                                            </div>
                                            <div className="form-group mb-2">
                                                <label className="form-label" htmlFor="email">Tên đăng nhập (<span className="text-danger">*</span>)</label>
                                                <Field name="userName" type="text" id="userName" placeholder="Nhập tên của bạn"
                                                       className="form-control"/>
                                            </div>
                                            <div className="form-group mb-2">
                                                <label className="form-label" htmlFor="email">Số điện thoại (<span className="text-danger">*</span>)</label>
                                                <Field name="phone" type="number" id="phone" placeholder="Nhập số điện thoại của bạn"
                                                       className="form-control"/>
                                            </div>
                                            <div className="form-group mb-2">
                                                <label className="form-label" htmlFor="email">Ngày sinh (dd/mm/yyyy) (<span className="text-danger">*</span>)</label>
                                                <Field name="dayOfBirth" type="date" id="dayOfBirth" placeholder="Nhập ngày sinh của bạn"
                                                       className="form-control"/>
                                            </div>
                                            <div>
                                                <input name="img" type="file" id="form2Example27"
                                                       className="form-control form-control-lg"
                                                       onChange={(event) => {
                                                           uploadFile(event.target.files[0], id)
                                                       }}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-4 text-center">
                                    <button type="button" className="btn btn-default" onClick={handleCancel}>Quay lại</button>
                                    <button type="submit" className="btn btn-primary">Thay đổi</button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </Modal>
            </>
        )
    } else {
        navigate("/")
    }

}