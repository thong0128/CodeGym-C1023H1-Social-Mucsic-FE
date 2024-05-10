import React, {useContext, useEffect, useState} from 'react';
import {SongItem} from "./index";
import axios from "axios";
import {AppContext} from "../Context/AppContext";
import {toast} from "react-toastify";
import {HiOutlinePencil} from "react-icons/hi";
import {Modal} from "antd";
import {IoCloseOutline, IoHeartOutline, IoHeartSharp} from "react-icons/io5";
import ModalEditPlayList from "./ModalEditPlaylist";
import {AiOutlineDelete} from "react-icons/ai";
import swal from "sweetalert";
import {findSongById, getSongByPll} from "../service/SongService";
import {useDispatch} from "react-redux";

function ViewPlaylist() {
    const [List, setList] = useState();
    const [currentPll, setCurrentPll] = useState({});
    const [checkLike, setCheckLike] = useState(null);
    const {isFlag} = useContext(AppContext);
    const pllId = localStorage.getItem("idPll");
    const userId = localStorage.getItem("idUser");
    const {toggleFlag} = useContext(AppContext);
    const [userName1, setUserName1] = useState('')
    const dispatch = useDispatch();

    // Lấy thông tin của playlist hiện tại
    useEffect(() => {
        axios.get("http://localhost:8080/playlist/" + pllId).then((res) => {
                setCurrentPll(res.data);
                setUserName1(res.data.appUser.userName)
        })
    },[isFlag]);


    // Lấy ra tất cả bài hát có trong playlist hiện tại
    useEffect(() => {
        axios.get(`http://localhost:8080/playlist/song/${pllId}`).then((res) => {
            setList(res.data);
        })
    }, [isFlag]);

    // Xóa playlist hiện tại
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
                toast.success("Xóa thành công!", {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 700})
            })
        })
    }

    // Kiểm tra user đã like playlist này chưa
    useEffect(() => {
        userId?
            axios.get(`http://localhost:8080/likePll/isLiked/${userId}/${pllId}`).then((res) => {
                setCheckLike(res.data)
            }) : setCheckLike(false)
    },[isFlag]);

    // Like playlist hiện tại
    const handleLike = ()=>{
        axios.post(`http://localhost:8080/likePll/${userId}/${pllId}`).then((res) => {
            toggleFlag();
        })
    }
    const handleClick = () => {
        dispatch(getSongByPll(pllId));
        toggleFlag();

    };
    const handleCheck = (isCheck) => {
        setIsModalVisible(isCheck);
    }
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = (pid) => {
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
            <div className='mt-8 px-[59px] flex flex-col gap-4' style={{color: "white"}}>
                <div className='flex items-center justify-between mb-4'>
                    <h4 className='text-3xl font-bold'>Playlist của tôi</h4>
                    <span className='text-xs'>TẤT CẢ</span>
                </div>
                <div className="row">
                    <div className="flex flex-row gap-4 w-full">
                        <div className="w-1/3 h-full mx-auto rounded-xl flex justify-center">
                            <div>
                                <img
                                    className="w-[250px] h-[250px] rounded-xl transition-transform duration-300 transform hover:scale-110 hover:cursor-pointer"
                                    src="https://cdn.pixabay.com/photo/2017/05/09/10/03/music-2297759_1280.png"
                                    alt="" onClick={()=>handleClick()}/>
                                <div className="flex items-center justify-center mt-4">
                                    <span
                                        className="text-2xl text-center text-f text-white font-semibold">{currentPll.title}</span>
                                    <div
                                        className="ml-2 h-[22px] text-f text-base rounded-lg text-white my-auto font-semibold hover:cursor-pointer"
                                        onClick={() => showModal(pllId)}>
                                        <HiOutlinePencil size={24}/>
                                    </div>
                                </div>
                                <p className="text-center text-f text-slate-400">Tao boi {userName1}</p>
                                <div className="flex items-center justify-center mt-2">
                                    <AiOutlineDelete className="text-gray-400 hover:cursor-pointer hover:scale-125"
                                                     size={30} onClick={() => deletePlaylist(pllId)}/>
                                    <div onClick={() => handleLike()}>
                                        {checkLike ? <IoHeartSharp size={30}/> : <IoHeartOutline size={30}/>}
                                    </div>
                                    <div>{currentPll.countLike}</div>
                                </div>
                            </div>

                        </div>
                        <div className="w-2/3 mx-auto rounded-xl px-[10px] ml-4">
                            {List?.map(item => (
                                <div className="col-md-10">
                                    <SongItem
                                        sid={item.id}
                                        key={item.id}
                                        thumbnail={item.img_url}
                                        title={item.title}
                                        artists={item.singer}
                                        author={item.author}
                                        countLikes={item.countLike}
                                        countListen={item.listenCount}
                                        releaseDate={new Date()}
                                        check={false}
                                        removePll={true}
                                        location={'playlistSongs'}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Modal
                            width={350}
                            visible={isModalVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={null}
                            closeIcon={<IoCloseOutline size={24} style={{color: 'white'}}/>}
                        >
                            <ModalEditPlayList pllId={pllId} handler={handleCheck}/>
                        </Modal>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ViewPlaylist;