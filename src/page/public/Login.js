import {useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import {toast} from "react-toastify";
import "../../modalLogin.css"
import React, {useContext, useState} from "react";
import {AppContext} from "../../Context/AppContext";
import {Modal} from "antd";

export default function Login() {
    let navigate = useNavigate();
    let avaDefault = 'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png'
    const {toggleFlag} = useContext(AppContext);
    function setAcc(value) {
        axios.post('http://localhost:8080/users/login', value).then((res) => {
            console.log(res.data);

            if (res.data === false){
                alert("Tài khoản của bạn đã bị khóa");
            }
            else{
                toggleFlag();
                localStorage.setItem("idUser", res.data.id)
                localStorage.setItem("user", res.data.userName)
                if (res.data.avatar != null) {localStorage.setItem("avatar", res.data.avatar)}
                else {
                    localStorage.setItem("avatar", avaDefault);
                }

                localStorage.setItem("role", res.data.authorities[0].authority)
                localStorage.setItem("token", res.data.token)
                console.log("role:",localStorage.getItem("role"))
                navigate("/")
                toast.success("Đăng nhập thành công", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 700
                })
            }
        }).catch(() => {
            toast.error('Thông tin sai', {autoClose:700})
            navigate("/login")
        })
    }
    function next(){
        navigate("/register")
    }
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
    return (
        <>
            <Modal width={800} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <Formik initialValues={{
                userName: "",
                password: ""
            }}
                    enableReinitialize={true}
                    onSubmit={(value) => {
                        setAcc(value)
                    }}>
                <Form>
                    <div style={{textAlign: "center"}}>
                        <div className="card mt-32 rounded-2xl">
                                <div className="wrap-login100">
                                    <div className="login100-pic js-tilt">
                                        <img src="images/img-01.png" alt="IMG"/>
                                    </div>
                                    <div className="login100-form validate-form"><span className="login100-form-title">Đăng nhập Zingmp3</span>
                                        <div className="wrap-input100 validate-input"
                                             data-validate="Valid email is required: ex@abc.xyz">
                                            <Field className="input100" type="text" name="userName"
                                                   placeholder="Tên đăng nhập"/>
                                            <span className="focus-input100"></span>
                                            <span className="symbol-input100"><i className="fa fa-solid fa-user"
                                                                                 aria-hidden="true"></i></span>
                                        </div>
                                        <div className="wrap-input100 validate-input"
                                             data-validate="Password is required">
                                            <Field className="input100" type="password"
                                                   name="password" placeholder="Mật khẩu"/>
                                            <span className="focus-input100"></span>
                                            <span className="symbol-input100"><i className="fa fa-lock"
                                                                                 aria-hidden="true"></i></span>
                                        </div>
                                        <div className="container-login100-form-btn">
                                            <button className="login100-form-btn h-[40px]">
                                                Đăng nhập
                                            </button>
                                        </div>
                                        <a href="https://accounts.google.com/o/oauth2/auth?scope=email&redirect_uri=http://localhost:8080/login-google&response_type=code&client_id=80724656105-fg2ndheoujm7c7dd4ob1i9mq3ebdbjhb.apps.googleusercontent.com&approval_prompt=force">Login
                                            With Gmail</a>
                                        <div>
                                            <button onClick={next} className="txt2">
                                                Tạo tài khoản mới
                                                <i className="fa fa-long-arrow-right m-l-5"
                                                   aria-hidden="true"></i>
                                            </button>
                                            <div>
                                                <button onClick={back} className="txt2">
                                                    <i className="fa fa-long-arrow-left m-l-5"
                                                    ></i>
                                                    Quay lại
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                        </div>
                    </div>

                </Form>
            </Formik>
            </Modal>
        </>
    )

    function back() {
        navigate("/")
    }
}


