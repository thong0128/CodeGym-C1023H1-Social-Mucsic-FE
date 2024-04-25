import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";


export default function UpdatePass() {
    const navigate = useNavigate()
    const id = localStorage.getItem("idUser");
    const [check , setCheck] = useState(false)
    const [user, setUser] = useState({})
    const handleCancel = () => {
        navigate("/")
    };
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
    return (
        <>
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
                            <div className="card mt-5 w-50">
                                <div className="card-header">Đổi mật khẩu</div>
                                <div className="card-body">
                                    <div className="form-outline mb-4">
                                        <label htmlFor="oldPassword">Mật khẩu cũ</label>
                                        <Field className="form-control" id="oldPassword" name={'oldPassword'}
                                               type='password' placeholder="Nhập mật khẩu cũ" required/>
                                        <ErrorMessage className={'text-danger'} name="oldPassword" component="div"/>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label htmlFor="password">Mật khẩu mới</label>
                                        <Field className="form-control" id="password" name={'password'}
                                               type='password' placeholder="Nhập mật khẩu mới"/>
                                        <ErrorMessage className={'text-danger'} name="password" component="div"/>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
                                        <Field className="form-control" id="confirmPassword"
                                               name={'confirmPassword'}
                                               placeholder="Nhập lại mật khẩu" type='password'/>
                                        <ErrorMessage className={'text-danger'} name="confirmPassword" component="div"/>
                                    </div>
                                    <div className="container-login100-form-btn">
                                        <button className="login100-form-btn">
                                            Đổi mật khẩu
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
        </>
    )

    function updatePassword(values) {
        if (values.password === values.confirmPassword) {
            let userPass = {
                password: values.password,
                confirmPassword : values.confirmPassword
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
