import React, {useContext, useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../Context/AppContext";

const ModalEditPlayList = ({handler, pllId}) => {
    const navigate = useNavigate();
    const id_user = localStorage.getItem("idUser")
    const [playlistCheck, setPlaylistCheck] = useState([]);
    const {isFlag} = useContext(AppContext);
    const {toggleFlag} = useContext(AppContext);

    useEffect(() => {
        axios.get('http://localhost:8080/playlist').then(res => {
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
                id:pllId,
                title: "",
                appUser: {
                    id: id_user
                }
            }}
                    validationSchema={
                        require("yup").object().shape({
                            title: require("yup")
                                .string()
                                .required("Vui lòng nhập tên Playlist").test('unique', 'Playlist đã tồn tại', (value) => {
                                    return !playlistCheck.includes(value);
                                }),
                        })
                    }
                    enableReinitialize={true}
                    onSubmit={(values, {resetForm}) => {
                        axios.put("http://localhost:8080/playlist/update", values).then(() => {
                            toast.success("Cập nhật playlist thành công", {
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
                        <p className="text-xl text-center text-white font-semibold mt-2">Chỉnh sửa playlist</p>
                        <div className="col-auto mb-2 mt-4">
                            <ErrorMessage style={{color: 'red'}} className={'formik-error-message text-f text-white'}
                                          name="title" component="div"/>
                            <Field name="title" type="text" className={`h-[40px] mt-2 p-3 text-f text-white rounded-full w-full border-none outline-none ${isFocused? 'bg-[#493961]' : 'bg-[#493961]' }`}
                                   placeholder="Nhập tên playlist"
                                   id = "playlistText"
                                   onFocus={handleFocus}
                                   onBlur={handleBlur}
                            /><br/>
                        </div>
                        <div className="text-center mt-2 p-3">
                            <button type="submit" className="text-f rounded-full w-full h-10">LƯU</button>
                        </div>
                    </div>

                </Form>
            </Formik>
        </>
    );
};

export default ModalEditPlayList;