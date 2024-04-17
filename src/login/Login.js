import './login.css'
import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useState} from "react";
export default function Login(){
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const formik = useFormik({
        initialValues: {user},
        onSubmit: values => {
            // console.log(values)
            axios.post(" http://localhost:8080/login", values).then(
                res =>{
                    if (res.data === false){
                        alert("Tài khoản của bạn đã bị khóa");
                    }
                    else{
                        localStorage.setItem("idUser", res.data.id)
                        localStorage.setItem("user", res.data.username)
                        localStorage.setItem("role", res.data.authorities[0].authority)
                        console.log("user:",localStorage.getItem("user"))
                        navigate("/home")

                    }
                }).catch(() => {
                alert("thong tin sai")
                })
        }
    });
    return(
        <>
            <div className="wrapper bg-white">
                <div className="h2 text-center">MP3</div>
                <div className="h4 text-muted text-center pt-2">Enter your login details</div>
                <form className="pt-3">
                    <div className="form-group py-2">
                        <div className="input-field"><span className="far fa-user p-2"></span>
                            <input id="login-name" name={"username"} type="text" placeholder="Enter your username" required className=""
                            value={formik.values.user.username} onInput={formik.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group py-1 pb-2">
                        <div className="input-field"><span className="fas fa-lock p-2"></span>
                            <input id="login-pass" type="password" name={"password"} placeholder="Enter your Password" required className=""
                            value={formik.values.user.password} onInput={formik.handleChange}/>
                            <button className="btn bg-white text-muted"><span className="far fa-eye-slash"></span>
                            </button>
                        </div>
                    </div>
                    <div className="d-flex align-items-start">
                        <div className="ml-auto"><a href="#" id="forgot">Forgot Password?</a></div>
                    </div>
                    <button className="btn btn-block text-center my-3" onClick={formik.handleSubmit}>Log in</button>
                    <div className="text-center pt-3 text-muted">Not a member?<Link to={'/register'}>Sign up</Link></div>
                </form>
            </div>
        </>
    )
}