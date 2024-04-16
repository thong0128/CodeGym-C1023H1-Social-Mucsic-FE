import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


export default function UpdatePass() {
    const navigate = useNavigate()
    const id = useState(localStorage.getItem("idUser"));
    const [check , setCheck] = useState(false)
    useEffect(() => {

    },[check])
    return (
        <>
            <Formik
                initialValues={{}}
                validationSchema={
                    require("yup").object().shape({
                        newpassword: require("yup")
                            .string()
                            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm số, chữ thường và chữ hoa")
                            .required("Vui lòng nhập mật khẩu mới."),

                    })
                }
                onSubmit={(user1) => {
                    updatePassword(user1)
                }
            }
                enableReinitialize={true}>
                <Form>
                    <div className="d-flex justify-content-center">
                        <div className="card mt-5 w-25">
                            <div className="card-header">Đổi mật khẩu</div>
                            <div className="card-body">
                                <div className="form-outline mb-4">
                                    <label htmlFor="oldpassword">Mật khẩu cũ</label>
                                    <Field className="form-control" id="oldpassword" name={'oldpassword'} type='password' placeholder="Nhập mật khẩu cũ" required/>
                                </div>
                                <div className="form-outline mb-4">
                                    <label htmlFor="newpassword">Mật khẩu mới</label>
                                    <Field className="form-control" id="newpassword" name={'newpassword'} type='password' placeholder="Nhập mật khẩu mới"/>
                                    <ErrorMessage className={'text-danger'} name="newpassword" component="div"/>
                                </div>
                                <div className="form-outline mb-4">
                                    <label htmlFor="newpassword">Nhập lại mật khẩu</label>
                                    <Field className="form-control" id="confirmedPassword" name={'confirmedPassword'}  placeholder="Nhập lại mật khẩu" type='password'/>
                                </div>
                                <button className="btn btn-primary btn-block" type={"submit"}>Cập nhật</button>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    )

    function updatePassword(user1) {

        console.log(id[0])
        if (user1.newpassword === user1.confirmedPassword  ) {
            let userPass = {
                id: id[0],
                password: user1.oldpassword,
                confirmedPassword : user1.newpassword ,
            }
            axios.put('http://localhost:8080/users/changePassword/' + id[0], userPass).then((res) => {
                toast.success("Cập nhật thành công")
                navigate('/')
            }).catch(() => {
                toast.error("Cập nhật thất bại")
            })
        }else {
            toast.error("Không thành công")
        }
    }




}
