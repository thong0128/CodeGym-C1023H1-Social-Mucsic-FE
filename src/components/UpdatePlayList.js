import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import {toast} from "react-toastify";
import {IoAddOutline} from "react-icons/io5";

function UpdatePlayList(props) {
    const navigate = useNavigate();
    const [playList, setPlayList] = useState({})
    const idPlayList = useParams()
    useEffect(() => {
        axios.get("http://localhost:8080/playlists/" + idPlayList.id).then((res)=>{
            setPlayList(res.data);
        })
    }, []);

    return (
        <>
            <Formik initialValues={{
                name: playList.name,
                appUser: {
                    id: localStorage.getItem("idUser")
                }
            }}
                    enableReinitialize={true}
                    onSubmit={(values)=>{

                        values.id = idPlayList.id;
                        axios.put("http://localhost:8080/playlists/update", values).then((res)=>{
                            toast.success("Sửa playlist thành công", {
                                position: toast.POSITION.BOTTOM_RIGHT
                            })
                            navigate("/showPlaylist")
                        }).catch(() => {
                            toast.error('Không thể update')
                        })
                    }}>
                <Form>
                    <div className="row g-3 align-items-center" style={{width:400, marginLeft: 20}}>
                        <div className="col-auto"  >
                            <label htmlFor="name" className="col-form-label"><IoAddOutline/></label>
                        </div>
                        <div className="col-auto">
                            <Field name="name" type="text" id="name" className="form-control"/>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Sửa</button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    );
}

export default UpdatePlayList;