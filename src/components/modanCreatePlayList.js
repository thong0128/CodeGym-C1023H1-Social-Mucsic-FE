import React, {useContext, useEffect, useState} from 'react';
import {Button, Modal} from 'antd';
import {AiOutlinePlus} from "react-icons/ai";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import {toast} from "react-toastify";
import {IoAddOutline} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../Context/AppContext";

const ModalCreatePlayList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const  handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const navigate = useNavigate();
    const id_user = localStorage.getItem("idUser")
    const [listPlaylistCheck, setPlaylistCheck] = useState([]);
    const {isFlag} = useContext(AppContext);
    const {toggleFlag} = useContext(AppContext);

    // useEffect(() => {
    //     axios.get('http://localhost:8080/playLists').then(res => {
    //         setPlaylistCheck(findPlaylist(res.data)) ;
    //     })
    // }, [ isFlag]);
    const dataPlayLists = {}
    useEffect(() => {
        setPlaylistCheck(findPlaylist(dataPlayLists))
    }, []);
    function findPlaylist (data) {
        let a = [];
        for (let i = 0; i < data.length; i++) {
            a.push(data[i].namePlayList)
        }
        return a;
    }
    return (
        <>
            <Button type="primary" onClick={showModal}>
                 Thêm PlayList
            </Button>
            <Modal title="Tạo PlayList cho riêng mình" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Formik initialValues={{
                    namePlayList: "",
                    id_users: {
                        id: id_user
                    }
                }}
                        validationSchema={
                            require("yup").object().shape({
                                namePlayList: require("yup")
                                    .string()
                                    .required("Vui lòng nhập tên Playlist").test('unique', 'Playlist đã tồn tại', (value) => {
                                        return !listPlaylistCheck.includes(value);
                                    }),
                            })
                        }
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            console.log("value playlist:", values)
                            axios.put("http://localhost:8080/playLists", values).then((res) => {
                                if (res.data === false){
                                    toast.error('Không thể tạo')
                                }
                                toast.success("Tạo playlist thành công", {
                                    position: toast.POSITION.BOTTOM_RIGHT
                                })
                                navigate("/showPlaylist")
                               toggleFlag()
                            }).catch(() =>{
                                toast.error(" Bạn cần đăng nhập")
                                navigate("/login")
                            })
                        }}>
                    <Form>
                        <div className="row g-3 align-items-center" style={{width: 400, marginLeft: 20, display:'align-items-center'  }}>
                            <div className="col-auto">
                                <label htmlFor="inputPassword6" className="col-form-label"></label>
                            </div>
                            <div className="col-auto">
                                <h5>Tên PlayList</h5>
                                <ErrorMessage style={{color:'red'}}  className={'formik-error-message'} name="namePlayList" component="div"/>
                                <Field name="namePlayList" type="text" id="input" className="form-control"
                                       aria-describedby="passwordHelpInline"/><br/>
                                <div className="col-auto">
                                    <button type="submit" className="btn btn-primary">Thêm</button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </Modal>
        </>
    );
};

export default ModalCreatePlayList;