import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import swal from "sweetalert";
import {AppContext} from "../Context/AppContext";
import {HiOutlinePencil} from "react-icons/hi";
import {Modal} from "antd";
import ModalEditPlayList from "./ModalEditPlaylist";
import {IoCloseOutline} from "react-icons/io5";
import {AiOutlineDelete} from "react-icons/ai";
import {favoriteSongs, getSongByPll} from "../service/SongService";
import {useDispatch} from "react-redux";

const ShowPlaylist = () => {
    const [playlistId, setPlaylistId] = useState(null);
    const [list, setList] = useState([]);
    const {toggleFlag} = useContext(AppContext);
    const {isFlag} = useContext(AppContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const idUser = localStorage.getItem("idUser");
    useEffect(() => {
        axios.get("http://localhost:8080/playlist/user/" + idUser).then((res) => {
            if (res.data !== []){
                setList(res.data);
            } else {
                toast.success("Bạn chưa có PlayList nào")
            }})
    }, [isFlag]);

    function deletePlaylist(id) {
        swal({
            text: "Bạn có muốn xóa Playlist này không?",
            icon: "info",
            buttons: {
                cancel: true,
                confirm: true
            },
        }).then(r=>{
            axios.delete("http://localhost:8080/playlist/" + id).then((res) => {
                toggleFlag()
                toast.success("Xóa thành công!", {autoClose: 700})
            })
        })

    }
    const handleCheck = (isCheck) => {
        setIsModalVisible(isCheck);
    }
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = (pid) => {
        setIsModalVisible(true);  // Đặt trạng thái của modal là hiển thị
        setPlaylistId(pid)
    };
    const handleOk = () => {
        setIsModalVisible(false);  // Đặt trạng thái của modal là ẩn khi nhấn OK
    };
    const handleCancel = () => {
        setIsModalVisible(false);  // Đặt trạng thái của modal là ẩn khi nhấn Cancel
    };

    useEffect(()=>{
        dispatch(favoriteSongs())
    },[isFlag])


    function getSongsPll(value) {
        dispatch(getSongByPll(value))
        localStorage.setItem("idPll", value);
        navigate("/viewPlaylist/"+value)
    }

    return (
        <>
            <div style={{color: "white", marginTop: 30}}>
                <div className="name_playlist px-4" style={{paddingBottom: 20, fontSize: 30, paddingLeft: 10}}>
                    Danh sách Playlist
                </div>
                <div className="flex flex-row flex-wrap gap-12 px-4">
                    {list.map((i, key) => {
                        return (
                            <div className="text-white w-[300px] h-[300px] text-center p-2 mt-2"  >
                                <div className="w-[250px] h-[250px] mx-auto rounded-xl overflow-hidden" onClick={()=>{
                                    getSongsPll(i.id)}
                                }>
                                    <img
                                        className="rounded-xl transition-transform duration-300 transform hover:scale-125 hover:cursor-pointer"
                                        src="https://cdn.pixabay.com/photo/2017/05/09/10/03/music-2297759_1280.png"
                                        alt=""/>
                                </div>
                                <div className="flex items-center justify-center mt-2">
                                    <span >
                                        <Link className="text-xl text-f text-white font-semibold" onClick={()=>{
                                            getSongsPll(i.id)}
                                        } to={"/viewPlaylist/"+i.id}>
                                            {i.title}
                                        </Link>
                                    </span>
                                    <div className="ml-2 h-[22px] text-f text-base rounded-lg text-white my-auto font-semibold hover:cursor-pointer"
                                        onClick={()=>showModal(i.id)}>
                                        <HiOutlinePencil size={24}/>
                                    </div>
                                </div>
                                <p>Tạo bởi {i.appUser.userName}</p>
                                <div className="flex items-center justify-center mb-2">
                                    <AiOutlineDelete className="text-gray-400 hover:cursor-pointer hover:scale-125" size={30} onClick={()=>deletePlaylist(i.id)} />
                                </div>
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
                        closeIcon={<IoCloseOutline size={24} style={{ color: 'white' }} />}
                    >
                        <ModalEditPlayList pllId={playlistId}   handler={handleCheck}/>
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default ShowPlaylist;