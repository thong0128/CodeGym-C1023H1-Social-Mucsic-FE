import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {Modal} from "antd";


export default function UpdatePass() {
    const navigate = useNavigate()
    const id = localStorage.getItem("idUser");
    const [check , setCheck] = useState(false)
    const [user, setUser] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(true);
    const token = localStorage.getItem('token'); // Lấy token từ Local Storage

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Thêm token vào Authorization header
        }
    };
    useEffect(() => {
        if(id != null) {
            axios.get('http://localhost:8080/users/' + id, config).then((res) => {
                console.log(res.data)
                setUser(res.data)
            })
        }
    }, [check])
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
    return (
        <>
            <Modal width={500} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                   footer={null}>
            <Formik
                initialValues={{}}
                validationSchema={
                    require("yup").object().shape({
                        oldPassword: Yup.string().matches(`${user.oldPassword}`, "Mật khẩu sai!!!")
                            .required("Không được để trống!"),
                        password: require("yup")
                            .string()
                            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm số, chữ thường và chữ hoa")
                            .required("Vui lòng nhập mật khẩu mới."),
                        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Mật khẩu không khớp!')
                            .required('Vui lòng nhập lại mật khẩu mới.')

                    })
                }
                onSubmit={(values) => {
                    updatePassword(values)
                    }
                }
                enableReinitialize={true}>
                <Form>
                        <div className="d-flex justify-content-center">
                            <div className="card rounded-2xl">
                                <p className="card-header text-gray-800 text-xl">Đổi mật khẩu</p>
                                <div className="card-body">
                                    <div className="form-outline mb-4">
                                        <label htmlFor="oldPassword" className="uppercase">Mật khẩu cũ</label>
                                        <Field className="form-control rounded-full text-f" id="oldPassword" name={'oldPassword'}
                                               type='password' placeholder="Nhập mật khẩu cũ" required/>
                                        <ErrorMessage className={'text-danger text-f'} name="oldPassword"
                                                      component="div"/>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label htmlFor="password" className="uppercase">Mật khẩu mới</label>
                                        <Field className="form-control rounded-full text-f" id="password" name={'password'}
                                               type='password' placeholder="Nhập mật khẩu mới"/>
                                        <ErrorMessage className={'text-danger text-f'} name="password" component="div"/>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label htmlFor="confirmPassword" className="uppercase">Nhập lại mật khẩu</label>
                                        <Field className="form-control rounded-full text-f" id="confirmPassword"
                                               name={'confirmPassword'}
                                               placeholder="Nhập lại mật khẩu" type='password'/>
                                        <ErrorMessage className={'text-danger text-f'} name="confirmPassword"
                                                      component="div"/>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className="login100-form-btn w-30 m-auto h-12">
                                        Cập nhật
                                    </button>
                                    <button type="button" className="mt-2 text-base text-f"
                                            onClick={handleCancel}>Quay lại
                                    </button>
                                </div>
                            </div>
                        </div>
                </Form>
            </Formik>
            </Modal>
        </>
    )

    function updatePassword(values) {
        if (values.password === values.confirmPassword) {
            let userPass = {
                password: values.password,
                confirmPassword: values.confirmPassword
            }
            axios.put('http://localhost:8080/users/update/pass/' + id, userPass, config).then((res) => {
                toast.success("Cập nhật thành công", {autoClose : 1500})
                navigate('/')
            }).catch(() => {
                toast.error("Cập nhật thất bại", {autoClose : 1500})
            })
        }else {
            toast.error("Không thành công", {autoClose : 1500})
        }
    }




}
