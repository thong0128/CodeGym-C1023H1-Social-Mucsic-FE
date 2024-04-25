import './update-user.css'
import {Field, Form, Formik, useFormik} from "formik";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import React from 'react';
import {Modal} from 'antd';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../Context/AppContext";
import {storage} from "../fireBase/FirebaseConfig";
import {getDownloadURL,ref,uploadBytes} from "firebase/storage";

export default function UpdateUser() {
    const navigate = useNavigate()
    const {toggleFlag} = useContext(AppContext);
    const id = localStorage.getItem("idUser")
    const [user, setUser] = useState({})
    const [uploadedImageUrl, setUploadedImageUrl] = useState(undefined);
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
    useEffect(() => {
        if(id != null) {
            axios.get('http://localhost:8080/users/' + id).then((res) => {
                console.log(res.data)
                setUser(res.data)
            })
        }
    }, [])
    const uploadFile = (image) => {
        if (image === null) return
        const imageRef = ref(storage, `IMG-AVATAR/${image.name}`);
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setUploadedImageUrl(url); // Lưu URL sau khi upload thành công vào state mới
                console.log("image uploaded successfully", url);
                console.log("image uploaded successfully", uploadedImageUrl);
                user.avatar = url;
                if (id != null){
                    axios.put("http://localhost:8080/users/update/infor/" + id, user).then((res) => {
                        toast.success("Đã thêm ảnh thành công")
                    })
                }
            });
        });
    };

    if (id != null){
        return (
            <>
                <Modal width={1000} title="Update Information" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                       footer={null}>
                    <Formik
                        initialValues={
                           user
                        }
                        enableReinitialize={true}
                        onSubmit={(user1) => {
                            axios.put("http://localhost:8080/users/update/infor/" + id, user1).then((res) => {
                                localStorage.setItem("user", res.data.username)
                                toast.success("Update successfully")
                                navigate("/")
                            }).catch(() => {
                                toast.error("Update does not successfully")
                            })
                            toggleFlag()
                        }}
                    >
                        <Form>
                            <div className="card">
                                <div className="row align-items-center no-gutters">
                                    <div className="col-md-5 upload-img">
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
                                            }}/></label>
                                    </div>

                                    <div className="col-md-7">
                                        <div className="card-body">
                                            <div className="form-group mb-2">
                                                <label className="form-label" htmlFor="userName">User name (<span
                                                    className="text-danger">*</span>)</label>
                                                <div className="input-field"><span className="far fa-user p-2"></span>
                                                    <Field name="username" type="text" id="userName"
                                                           className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="form-group mb-2">
                                                <label className="form-label" htmlFor="email">Email (<span
                                                    className="text-danger">*</span>)</label>
                                                <div className="input-field"><span
                                                    className="fas fa-envelope p-2"></span>
                                                    <Field name="email" type="email" id="email"
                                                           className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="form-group mb-2">
                                                <label className="form-label" htmlFor="phoneNumber">Phone number (<span
                                                    className="text-danger">*</span>)</label>
                                                <div className="input-field"><span className="fas fa-phone p-2"></span>
                                                    <Field name="phoneNumber" type="text" id="phoneNumber"
                                                           placeholder="Nhập tên của bạn"
                                                           className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="form-group mb-2">
                                                <label className="form-label" htmlFor="address">Address (<span
                                                    className="text-danger">*</span>)</label>
                                                <div className="input-field"><span className="fas fa-house p-2"></span>
                                                    <Field name="address" type="text" id="address"
                                                           placeholder="Address"
                                                           className="form-control"/>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="my-4 text-center">
                                    <button type="button" className="btn btn-default" onClick={handleCancel}>Back
                                    </button>
                                    <button type="submit" className="btn btn-primary">Update</button>
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