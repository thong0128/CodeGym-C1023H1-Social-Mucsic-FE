import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Dropdown} from "antd";
import {AiOutlineEllipsis,} from "react-icons/ai";
import {toast} from "react-toastify";
import {Field, Form, Formik} from "formik";


function DropdownSong({idSong}) {

    const [playlists, setPlaylist] = useState([])
    const idUser = localStorage.getItem("idUser")
    useEffect(() => {
        if(idUser != null){
            axios.get("http://localhost:8080/playlists/findByUserId/" + idUser).then((res) => {
                setPlaylist(res.data)
            })
        }
    }, []);


    const items = [
        {
            key: '1',
            label: (
                <div>
                    <select onChange={(e) => {
                        addPlayList(e.target.value)
                    }}>
                        <option>Thêm vào PlayList</option>
                        {playlists.map((i,key) => {
                            return(
                                <option key={key} value={i.id}>{i.name}</option>
                            )
                        })}
                    </select>
                </div>
            ),
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(true);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const  handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        // navigate("/")
    };
    return (
        <>

            {/*<Dropdown*/}
            {/*    menu={{*/}
            {/*        items,*/}
            {/*    }}*/}
            {/*    placement="top"*/}
            {/*    arrow*/}
            {/*>*/}
                <AiOutlineEllipsis size={20} className="text-white"/>
            {/*</Dropdown>*/}
        </>
    )

    function addPlayList({idPlaylist}) {
        return (
            <Formik
                initialValues={{
                    song: {
                        id: idSong
                    },
                    playList: {
                        id: idPlaylist
                    }
                }}
                onSubmit={(values) => {
                    axios.put("http://localhost:8080/playlists/song/create/",values).then(() => {
                        toast.success("Thêm thành công vào playlist");
                    })
                }}>
                <Form>
                    <Field type="hidden" name="song.id" />
                    <Field type="hidden" name="playList.id" />
                </Form>
            </Formik>
        );
    }
}
export default DropdownSong;