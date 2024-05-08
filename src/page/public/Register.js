import React, {useEffect, useState} from 'react';
import {Formik, Form, ErrorMessage, Field} from 'formik';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import * as Yup from "yup";
import {Modal} from "antd";
export default function Register() {
    // const [listMailCheck, setListEmailCheck] = useState([]);
    const [listUserCheck, setListUserCheck] = useState([]);
    const [user, setUser] = useState({})
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8080/users').then(res => {
            // setListEmailCheck(findEmail(res.data)) ;
            setListUserCheck(findUser(res.data)) ;
        })
    }, []);

    // const users1 = {}
    // useEffect(() => {
    //     // setListEmailCheck(findEmail(users1.data)) ;
    //     setListUserCheck(findUser(users1.data)) ;
    // }, []);
    function findUser (data) {
        let a = [] ;
        for (let i = 0; i < data.length; i++) {
            a.push(data[i].userName)
        }
        return a ;
    }
    // function findEmail (data) {
    //     let a = [] ;
    //     for (let i = 0; i < data.length; i++) {
    //         a.push(data[i].email)
    //     }
    //     return a ;
    // }

    const handleButtonClick = (values) => {
        if(values !== null) {
            axios.post('http://localhost:8080/users/register', values)
                .then((res) => {
                    toast.success('Đăng kí thành công', {autoClose : 700})
                    console.log(values)

                    // toast.success('Đăng kí thành công vui lòng đăng nhập lại', {autoClose : 700})
                    navigate('/login')
                })
        }else {
            toast.warning('Vui lòng điền đủ thông tin', {autoClose : 700})
        }
    };
    const onSubmit = (values) => {
        let user = {
            userName : values.userName ,
            password : values.password,
            confirmPassword : values.confirmPassword
        }
        // console.log(user)
        handleButtonClick(user) ;
    };
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
        <div>
            <Modal width={800} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <Formik
                initialValues={{
                    user
                }}
                validationSchema={
                    require("yup").object().shape({
                        userName: require("yup")
                            .string()
                            .matches(/^[a-zA-Z0-9_]+$/, "Tên tài khoản không hợp lệ")
                            .required("Vui lòng nhập tên tài khoản").test('unique', 'Tài khoản đã tồn tại', (value) => {
                                return !listUserCheck.includes(value);
                            }),
                        password: require("yup")
                            .string()
                            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm số, chữ thường và chữ hoa")
                            .required("Vui lòng nhập mật khẩu."),
                        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Password does not match!')
                            .required('You must fill in this section')
                        // phoneNumber: Yup.string().matches(/((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/, "Not Vietnam's phone number")
                        //     .required("Invalid phone number")
                        // email: require("yup")
                        //     .string()
                        //     .email("Email không hợp lệ.")
                        //     .required("Vui lòng nhập email.").test('unique', 'Email đã tồn tại', (value) => {
                        //         return !listMailCheck.includes(value);
                        //     }),
                    })
                }
                onSubmit={onSubmit}
                enableReinitialize={true}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div style={{textAlign: "center"}}>
                                <div className="card mt-32 rounded-2xl">
                                    <div className="wrap-login100">
                                        <div className="login100-pic js-tilt">
                                            <img src="images/img-01.png" alt="IMG"/>
                                        </div>
                                        <div className="login100-form validate-form">
					<span className="login100-form-title">
						Đăng ký Zingmp3
					</span>
                                            <ErrorMessage style={{color: 'red'}} className={'formik-error-message'}
                                                          name="userName" component="div"/>
                                            <div className="wrap-input100 validate-input">
                                                <Field className="input100" type="text" name="userName"
                                                       placeholder="Tên tài khoản"/>
                                                <span className="focus-input100"></span>
                                                <span className="symbol-input100">
							<i className="fa fa-solid fa-user" aria-hidden="true"></i>
						</span>
                                            </div>
                                            <ErrorMessage style={{color: 'red'}} className={'formik-error-message'}
                                                          name="password" component="div"/>
                                            <div className="wrap-input100 validate-input">
                                                <Field className="input100" type="password" name="password"
                                                       placeholder="Mật khẩu"/>
                                                <span className="focus-input100"></span>
                                                <span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
                                            </div>
                                            <ErrorMessage style={{color: 'red'}} className={'formik-error-message'}
                                                          name="confirmPassword" component="div"/>
                                            <div className="wrap-input100 validate-input">
                                                <Field className="input100" type="password" name="confirmPassword"
                                                       placeholder="Nhập lại mật khẩu"/>
                                                <span className="focus-input100"></span>
                                                <span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
                                            </div>
                                            <div className="container-login100-form-btn">
                                                <button className="login100-form-btn h-[40px]">
                                                    Đăng ký
                                                </button>
                                            </div>
                                            <a href="https://accounts.google.com/o/oauth2/auth?scope=email&redirect_uri=http://localhost:8080/login-google&response_type=code
    &client_id=80724656105-fg2ndheoujm7c7dd4ob1i9mq3ebdbjhb.apps.googleusercontent.com&approval_prompt=force">Login With
                                                Gmail</a>
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
                    </Form>
                )}
            </Formik>
            </Modal>


        </div>
    );

    function back() {
        navigate("/login")
    }
}

