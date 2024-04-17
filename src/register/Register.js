import './register.css';
import {useFormik} from "formik";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import * as Yup from 'yup';
export default function Register() {

    const [user, setUser] = useState({});
    const [listUserCheck, setListUserCheck] = useState([]);
    const navigate = useNavigate();
    const yup = require("yup");
    useEffect(() => {
        axios.get('http://localhost:8080/users').then(res => {
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
            <div className="main">
                <h1>Register</h1>
                <br/>
                <br/>
                <form onSubmit={formik.handleSubmit}>
                    <div className="row mb-3">
                        <label htmlFor="userName" className="col-sm-2 col-form-label">User name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name={"username"}
                                   value={formik.values.user.username} onInput={formik.handleChange}/>
                            {formik.errors.username && formik.touched.username && (<p>{formik.errors.username}</p>)}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" name={"password"}
                                   value={formik.values.password} onInput={formik.handleChange}/>
                            {formik.errors.password && formik.touched.password && (<p>{formik.errors.password}</p>)}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="confirmPassword" className="col-sm-2 col-form-label">Confirm Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" name={"confirmPassword"}
                                   value={formik.values.confirmPassword} onInput={formik.handleChange}/>
                            {formik.errors.confirmPassword && formik.touched.confirmPassword && (<p>{formik.errors.confirmPassword}</p>)}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="phoneNumber" className="col-sm-2 col-form-label">Phone number</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name={"phoneNumber"}
                                   value={formik.values.phoneNumber} onInput={formik.handleChange}/>
                            {formik.errors.phoneNumber && formik.touched.phoneNumber && (<p>{formik.errors.phoneNumber}</p>)}
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </div>
        </>
    );

}