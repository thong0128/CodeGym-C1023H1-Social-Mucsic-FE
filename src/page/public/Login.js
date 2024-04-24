import {useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import {toast} from "react-toastify";
import "../../modalLogin.css"
import React, {useContext} from "react";
import {AppContext} from "../../Context/AppContext";

export default function Login() {
    let navigate = useNavigate();
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
                localStorage.setItem("avatar", res.data.avatar)
                localStorage.setItem("role", res.data.authorities[0].authority)
                localStorage.setItem("token", res.data.token)
                console.log("role:",localStorage.getItem("role"))

                navigate("/")

                toast.success("Đăng nhập thành công", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            }
        }).catch(() => {
            toast.error('Thông tin sai')
            navigate("/login")
        })
    }
    function next(){
        navigate("/register")
    }
    return (
        <>
            <Formik initialValues={{
                userName: "",
                password: ""
            }}
                    enableReinitialize={true}
                    onSubmit={(value) => {
                        setAcc(value)
                    }}>
                <Form>
                    <div className="modal" id="modal">
                        <div className="modal_overlay">
                        </div>
                        <div className="modal_body">
                            <div className="modal_inner">
                                <div className="auth_form">
                                    <div className="auth_form_header">
                                        <div style={{textAlign: "center"}}>
                                            <div className="limiter">
                                                <div className="container-login100">
                                                    <div className="wrap-login100">
                                                        <div className="login100-pic js-tilt">
                                                            <img src="images/img-01.png" alt="IMG"/>
                                                        </div>
                                                        <div className="login100-form validate-form">
					<span className="login100-form-title">
						Đăng nhập Zingmp3
					</span>
                                                            <div className="wrap-input100 validate-input"
                                                                 data-validate="Valid email is required: ex@abc.xyz">
                                                                <Field className="input100" type="text" name="userName"
                                                                       placeholder="Tên đăng nhập"/>
                                                                <span className="focus-input100"></span>
                                                                <span className="symbol-input100">
							<i className="fa fa-solid fa-user" aria-hidden="true"></i>
						</span>
                                                            </div>
                                                            <div className="wrap-input100 validate-input"
                                                                 data-validate="Password is required">
                                                                <Field className="input100" type="password"
                                                                       name="password" placeholder="Mật khẩu"/>
                                                                <span className="focus-input100"></span>
                                                                <span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
                                                            </div>

                                                            <div className="container-login100-form-btn">
                                                                <button className="login100-form-btn">
                                                                    Đăng nhập
                                                                </button>
                                                            </div>

                        {/*                                    <div className="text-center p-t-12">*/}
						{/*<span className="txt1">*/}
						{/*	Forgot*/}
						{/*</span>*/}
                        {/*                                        <a className="txt2" href="#">*/}
                        {/*                                            Username / Password?*/}
                        {/*                                        </a>*/}
                        {/*                                    </div>*/}
                                                            <a href="https://accounts.google.com/o/oauth2/auth?scope=email&redirect_uri=http://localhost:8080/login-google&response_type=code
    &client_id=80724656105-fg2ndheoujm7c7dd4ob1i9mq3ebdbjhb.apps.googleusercontent.com&approval_prompt=force">Login With Gmail</a>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    )
    function back(){
        navigate("/")
    }
}


