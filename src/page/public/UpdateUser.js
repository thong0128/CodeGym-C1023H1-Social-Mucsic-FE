import '../../css_component/updateUser.css'
import {Field, Form, Formik} from "formik";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {storage} from "../../FireBase/FirebaseConfig";
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
    // const [image, setImage] = useState(null);
    const [api, contextHolder] = notification.useNotification();
    const [isModalOpen, setIsModalOpen] = useState(true);
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
        navigate("/")
    };
    useEffect(() => {
        if(id != null) {
            axios.get('http://localhost:8080/users/' + id, config).then((res) => {
                console.log(res.data)
                setUser(res.data)
            })
        }
    }, [])
    // const users1 = {}
    // useEffect(() => {
    //     setUser(users1)
    // }, []);

    const uploadFile = (image) => {
        if (image === null) return
        const imageRef = ref(storage, `IMG-ZingMP3/${image.name}`);
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setUploadedImageUrl(url); // Lưu URL sau khi upload thành công vào state mới
                console.log("image uploaded successfully", url);
                console.log("image uploaded successfully", uploadedImageUrl);
                user.avatar = url;
                if (id != null){
                    axios.put("http://localhost:8080/users/update/infor/" + id, user, config).then((res) => {
                        axios.get('http://localhost:8080/users/' + id).then((res) => {
                            console.log(res.data)
                            setUser(res.data)
                            localStorage.setItem("avatar", res.data.avatar);
                        })
                        toast.success("Đã thêm ảnh thành công", {autoClose : 1000})
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
                <Modal width={1000} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                       footer={null}>
                    <Formik
                        initialValues={user}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            axios.put("http://localhost:8080/users/update/infor/" + id, values, config).then((res) => {
                                localStorage.setItem("user", res.data.username)
                                toast.success("Cập nhật thành công", {autoClose : 1000})
                                navigate("/")
                            }).catch(() => {
                                toast.error("Cập nhật không thành công", {autoClose : 1000})
                            })
                            toggleFlag()
                        }}
                    >
                        <Form>
                            <div className="card">
                                <div className="row align-items-center no-gutters">
                                    <div className="col-md-6">
                                        <div className="col-md-12 upload-img">
                                            <label htmlFor="photo-upload" className="custom-file-upload fas">
                                                <div className="img-wrap img-upload">
                                                    {user.avatar == null ? <img
                                                            src="https://shc-p-001.sitecorecontenthub.cloud/api/public/content/9cf0b7b0242b4acbaf6a4a3f5b468a63?v=6b97dab5"
                                                            className="img-fluid"/> :
                                                        <img src={user.avatar}
                                                             alt="login form" className="img-fluid"/>}
                                                </div>
                                                <input id="photo-upload" type="file" onChange={(event) => {
                                                    uploadFile(event.target.files[0])
                                                }}/>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card-body">
                                            <div className="form-group mb-2">
                                                <label className="form-label" htmlFor="email">Địa chỉ email (<span
                                                    className="text-danger">*</span>)</label>
                                                <Field name="email" type="email" id="email"
                                                       placeholder="Nhập Email của bạn"
                                                       className="form-control"/>
                                            </div>
                                            <div className="form-group mb-2">
                                                <label className="form-label" htmlFor="email">Tên đăng nhập (<span
                                                    className="text-danger">*</span>)</label>
                                                <Field name="userName" type="text" id="userName"
                                                       placeholder="Nhập tên của bạn"
                                                       className="form-control"/>
                                            </div>
                                            <div className="form-group mb-2">
                                                <label className="form-label" htmlFor="phone">Số điện thoại (<span
                                                    className="text-danger">*</span>)</label>
                                                <Field name="phoneNumber" type="phoneNumber" id="phone"
                                                       placeholder="Nhập số điện thoại của bạn"
                                                       className="form-control"/>
                                            </div>
                                            <div className="form-group mb-2">
                                                <label className="form-label" htmlFor="address">Địa chỉ
                                                    (<span className="text-danger">*</span>)</label>
                                                <Field name="address" type="text" id="address"
                                                       placeholder="Nhập địa chỉ của bạn"
                                                       className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="container-login100-form-btn">
                                            <button className="login100-form-btn">
                                                Cập nhật
                                            </button>
                                            <button type="button" className="btn btn-default"
                                                    onClick={handleCancel}>Quay lại
                                            </button>
                                        </div>
                                    </div>
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