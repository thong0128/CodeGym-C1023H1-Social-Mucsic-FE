import React, {useContext, useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../Context/AppContext";

const ModalEditPlayList = ({handler}) => {
    const navigate = useNavigate();
    const id_user = localStorage.getItem("idUser")
    const [playlistCheck, setPlaylistCheck] = useState([]);
    const {isFlag} = useContext(AppContext);
    const {toggleFlag} = useContext(AppContext);

    useEffect(() => {
        axios.get('http://localhost:8080/playlists').then(res => {
            setPlaylistCheck(checkName(res.data));
        })
    }, [ isFlag]);

    function checkName(data) {
        let namePlayList = [];
        for (let i = 0; i < data.length; i++) {
            namePlayList.push(data[i].name)
        }
        return namePlayList;
    }
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    return (
        <>
            <Formik initialValues={{
                name: "",
                appUser: {
                    id: id_user
                }
            }}
                    validationSchema={
                        require("yup").object().shape({
                            name: require("yup")
                                .string()
                                .required("Vui lòng nhập tên Playlist").test('unique', 'Playlist đã tồn tại', (value) => {
                                    return !playlistCheck.includes(value);
                                }),
                        })
                    }
                    enableReinitialize={true}
                    onSubmit={(values, {resetForm}) => {
                        axios.post("http://localhost:8080/playlists/create", values).then(() => {
                            toast.success("Tạo playlist thành công", {
                                position: toast.POSITION.BOTTOM_RIGHT,
                                autoClose:700
                            })
                            resetForm();
                            handler(false)
                            navigate("/showPlaylist")
                            toggleFlag()
                        })
                    }}>
                <Form>
                    <div className="card bg-[#34224f] rounded-xl mt-52">
                        <p className="text-xl text-center text-white font-semibold mt-2">Sửa</p>
                        <div className="col-auto mb-2 mt-4">
                            <ErrorMessage style={{color: 'red'}} className={'formik-error-message text-f text-white'}
                                          name="name" component="div"/>
                            <Field name="name" type="text" className={`h-[40px] mt-2 p-3 text-f text-white rounded-full w-full border-none outline-none ${isFocused? 'bg-[#493961]' : 'bg-[#493961]' }`}
                                   placeholder="Nhập tên playlist"
                                   id = "playlistText"
                                   onFocus={handleFocus}
                                   onBlur={handleBlur}
                            /><br/>
                        </div>
                        <div className="text-center mt-2">
                            <button type="submit" className="text-f rounded-full w-32 h-10">Tạo mới</button>
                        </div>
                    </div>

                </Form>
            </Formik>
        </>
    );
};

export default ModalEditPlayList;