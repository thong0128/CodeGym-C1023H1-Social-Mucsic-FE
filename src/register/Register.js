import './register.css';
import {useFormik} from "formik";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
export default function Register() {

    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {user},
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
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" name={"password"}
                                   value={formik.values.password} onInput={formik.handleChange}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="confirmPassword" className="col-sm-2 col-form-label">Confirm Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" name={"confirmPassword"}
                                   value={formik.values.confirmPassword} onInput={formik.handleChange}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="phoneNumber" className="col-sm-2 col-form-label">Phone number</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name={"phoneNumber"}
                                   value={formik.values.phoneNumber} onInput={formik.handleChange}/>
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