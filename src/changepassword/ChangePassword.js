import './changepassword.css';
import {useFormik} from "formik";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import * as Yup from 'yup';
export default function ChangePassword() {

    const [user, setUser] = useState({});
    const [oldPass, setOldPass] = useState("");
    const token = localStorage.getItem('token'); // Lấy token từ Local Storage
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Thêm token vào Authorization header
        }
    };
    const navigate = useNavigate();
    const id = localStorage.getItem("idUser");

    useEffect(() => {
        axios.get(`http://localhost:8080/users/${id}`, config).then(res => {
            console.log(res.data.oldPassword)
            console.log(token)
            setUser(res.data);
            setOldPass(res.data.oldPassword);
        })
    }, []);



    const formik = useFormik({
        initialValues: {user},
        validationSchema: Yup.object({
            oldPassword: Yup.string().matches(`${oldPass}`, "Password is wrong!!!")
                .required("You must fill this section!"),
            password: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "Password must contain at least 8 characters, including numbers, lowercase letters, and uppercase letters")
                .required("You must fill this section!"),
            confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Password does not match!')
                .required('You must fill in this section')
        }),
        onSubmit: values => {

            axios.put(` http://localhost:8080/users/update/pass/${id}`, values, config).then(
                res =>{
                    alert("Cap nhat thanh cong!!!");
                    navigate("/")
                })
        }
    });

    return (
        <>
            <div className={"container1"}>
            <div className="main bg-white">
                <div className="h2 text-center">Change Password</div>
                <br/>
                <br/>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group py-1 pb-2">
                        <div className="input-field"><span className="fas fa-lock p-2"></span>
                            <input type="password" className="form-control" name={"oldPassword"}
                                   placeholder={"Enter your old password"}
                                   value={formik.values.oldPassword} onInput={formik.handleChange}
                                  />

                        </div>
                        {formik.errors.oldPassword && formik.touched.oldPassword && (<p>{formik.errors.oldPassword}</p>)}

                    </div>
                    <div className="form-group py-1 pb-2">
                        <div className="input-field"><span className="fas fa-lock p-2"></span>
                            <input type="password" className="form-control" name={"password"}
                                   placeholder={"Enter your new password"}
                                   value={formik.values.password} onInput={formik.handleChange}/>
                        </div>
                        {formik.errors.password && formik.touched.password && (<p>{formik.errors.password}</p>)}
                    </div>
                    <div className="form-group py-1 pb-2">
                        <div className="input-field"><span className="fas fa-lock p-2"></span>
                            <input type="password" className="form-control" name={"confirmPassword"}
                                   placeholder={"Confirm your password"}
                                   value={formik.values.confirmPassword} onInput={formik.handleChange}/>
                        </div>
                        {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                            <p>{formik.errors.confirmPassword}</p>)}
                    </div>


                    <br/>
                    <br/>
                    <button type="submit" className="btn btn-primary">Accept</button>
                </form>
            </div>
            </div>
        </>
    );

}