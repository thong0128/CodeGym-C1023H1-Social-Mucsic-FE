import './changepassword.css';
import {useFormik} from "formik";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import * as Yup from 'yup';
export default function ChangePassword() {

    const [user, setUser] = useState({});
    const [listUserCheck, setListUserCheck] = useState([]);
    const navigate = useNavigate();
    const yup = require("yup");
    useEffect(() => {
        axios.get('http://localhost:8080/users/update/pass/id').then(res => {
            setListUserCheck(findUser(res.data)) ;
        })
    }, []);

    function findUser(data){
        let a = [];
        for (let i=0; i <data.length; i++){
            a.push(data[i].username)
        }
        return a;
    }

    const formik = useFormik({
        initialValues: {user},
        validationSchema: Yup.object({
            username: Yup.string().min(1, 'Username cannot be blank')
                .required('You must fill in this section!').test('unique', 'Account already exists', (value) =>{
                    return !listUserCheck.includes(value);
                }),
            password: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "Password must contain at least 8 characters, including numbers, lowercase letters, and uppercase letters")
                .required("You must fill this section!"),
            confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Password does not match!')
                .required('You must fill in this section'),
            phoneNumber: Yup.string().matches(/((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/, "Not Vietnam's phone number")
                .required("Invalid phone number")

        }),
        onSubmit: values => {

            axios.post(" http://localhost:8080/users/create", values).then(
                res =>{
                    alert("Them moi thanh cong!!!");
                    navigate("/login")
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
                            <input type="password" className="form-control" name={"password"}
                                   placeholder={"Enter your old password"}
                                   value={formik.values.password} onInput={formik.handleChange}/>
                        </div>
                        {formik.errors.password && formik.touched.password && (<p>{formik.errors.password}</p>)}
                    </div>
                    <div className="form-group py-1 pb-2">
                        <div className="input-field"><span className="fas fa-lock p-2"></span>
                            <input type="password" className="form-control" name={"password"}
                                   placeholder={"Enter your password"}
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