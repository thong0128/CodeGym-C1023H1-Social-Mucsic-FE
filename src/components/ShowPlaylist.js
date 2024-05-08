import React, {useContext, useEffect, useState} from 'react';
import {MdDeleteOutline, MdOutlineBrowserUpdated} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import swal from "sweetalert";
import {AppContext} from "../Context/AppContext";
import {HiOutlinePencil} from "react-icons/hi";
import {Modal} from "antd";
import ModalCreatePlayList from "./ModanCreatePlayList";
import ModalEditPlayList from "./ModalEditPlaylist";

const ShowPlaylist = () => {
    const [checkDelete, setCheckDelete] = useState(false);
    const [list, setList] = useState([]);
    const {toggleFlag} = useContext(AppContext);
    const {isFlag} = useContext(AppContext);
    const navigate = useNavigate();

    const idUser = localStorage.getItem("idUser");
    useEffect(() => {
        axios.get("http://localhost:8080/playlists/findByUserId/" + idUser).then((res) => {
            if (res.data !== []){
                setList(res.data);
            } else {
                toast.success("Bạn chưa có PlayList nào")
            }})
    }, [isFlag]);

    function updatePlaylist(id) {
        navigate("/updatePlayList/" + id)
    }

    function deletePlaylist(id) {
        axios.delete("http://localhost:8080/playlists/" + id).then((res) => {
            swal({
                text: "Bạn có muốn xóa Playlist này không?",
                icon: "info",
                buttons: {
                    cancel: true,
                    confirm: true
                },
            }).then(r => {
                if (r) {
                    axios.delete("http://localhost:8080/songs/" + id)
                        .then(() => {
                                setCheckDelete(!checkDelete)
                                toggleFlag()
                                toast.success("Xóa thành công!", {autoClose: 700})
                            }
                        )
                }
            })
        })
    }
    const handleCheck = (isCheck) => {
        setIsModalVisible(isCheck);
    }
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);  // Đặt trạng thái của modal là hiển thị
    };
    const handleOk = () => {
        setIsModalVisible(false);  // Đặt trạng thái của modal là ẩn khi nhấn OK
    };
    const handleCancel = () => {
        setIsModalVisible(false);  // Đặt trạng thái của modal là ẩn khi nhấn Cancel
    };

    return (
        <>
            <div style={{color: "white", marginTop: 30}}>
                <div className="name_playlist px-4" style={{paddingBottom: 20, fontSize: 30, paddingLeft: 10}}>
                    Danh sách Playlist
                </div>
                <div className="flex flex-row flex-wrap gap-8 px-4">
                    {list.map((i, key) => {
                        return (
                            <div className="text-white w-[300px] h-[300px] text-center p-2">
                                <div className="w-[250px] h-[250px] mx-auto rounded-xl overflow-hidden">
                                    <img
                                        className="rounded-xl transition-transform duration-300 transform hover:scale-125"
                                        src="https://cdn.pixabay.com/photo/2017/05/09/10/03/music-2297759_1280.png"
                                        alt=""/>
                                </div>
                                <div className="flex items-center justify-center mt-2">
                                    <span className="text-xl text-f text-white font-semibold">{i.name}</span>
                                    <div className="ml-2 h-[22px] text-f text-base rounded-lg text-white my-auto font-semibold"
                                        onClick={showModal}>
                                        <HiOutlinePencil size={24}/>
                                    </div>
                                </div>
                                <p>Tạo bởi {i.appUser.userName}</p>
                            </div>
                        )
                    })
                    }
                </div>
                <div>
                    <Modal
                        width={350}
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <ModalEditPlayList handler={handleCheck}/>
                    </Modal>
                </div>

                {/*    </tbody>*/}
                {/*</table>*/}
            </div>
        </>
    );
};

export default ShowPlaylist;