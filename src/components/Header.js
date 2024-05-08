import icons from "../untis/icons";
import Search from "./Search";
import {useNavigate} from "react-router-dom";
import MenuLogin from "./MenuLogin";
import "../css_component/menuSetting.css"
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import MenuLogOut from "./MenuLogOut";
import MenuAdmin from "./MenuAdmin";
import {FaRegCircleUser} from "react-icons/fa6";
import {AppContext} from "../Context/AppContext";
import {Modal} from "antd";
import ModalCreatePlayList from "./ModanCreatePlayList";
import {BiUser} from "react-icons/bi";

const {IoIosArrowRoundBack, IoIosArrowRoundForward} = icons
const Header = () => {
    const {isFlag } = useContext(AppContext);

    const navigate = useNavigate()
    const id = localStorage.getItem("idUser")
    let [user, setUser] = useState({})
    let [img,setImg] = useState('');
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

    useEffect(() => {
        if (id !== null){
            axios.get('http://localhost:8080/users/' + id).then((res) => {
                console.log(res.data)
                setUser(res.data)
                setImg(localStorage.getItem("avatar"));
            })}else {
            navigate("/")
        }
    }, [isFlag])

    const [check, setCheck] = useState(false)
    if (localStorage.getItem("idUser") !== null) {
        if (localStorage.getItem("role") === "ROLE_ADMIN") {
            return (
                <div className={' flex justify-between w-full items-center border-none'}
                     style={{zIndex: 100}}>
                    <div className={'flex gap-6 w-full items-center'}>
                        <div className={'flex text-gray-400 gap-4'}>
                            <button onClick={() => navigate(-1)}><IoIosArrowRoundBack style={{fill: "white"}} size={24}/></button>
                            <button onClick={() => navigate(1)}><IoIosArrowRoundForward style={{fill: "white"}} size={24}/></button>
                        </div>
                        <div className={'w-1/2'}>
                            <Search/>
                        </div>
                    </div>
                    <div style={{display: "flex"}}>
                        <div className="dev_logout">
                            <button onClick={() =>{
                                setCheck(!check)
                            }

                            }>
                                <img src={img}
                                     style={{
                                    width: 40,
                                    height: 40,
                                    marginTop: 5,
                                    marginLeft: 2,
                                    marginRight: 30,
                                    borderRadius: 20
                                }} onClick={showModal}/>
                            </button>
                        </div>
                    </div>
                    <div className="form_menu" >
                        <div style={{marginTop: "149px" , position : 'absolute' , marginLeft: '-14%' ,height :'0px'}}> {check ? <MenuAdmin handler={handleCheck}></MenuAdmin> : <></>}</div>
                    </div>
                </div>
            )
        } else {
            return (
                <>
                    <div className={' flex justify-between w-full items-center'}
                         style={{zIndex: 100}}>
                        <div className={'flex gap-6 w-full items-center'}>
                            <div className={'flex text-gray-400 gap-4'}>
                                <button onClick={() => navigate(-1)}><IoIosArrowRoundBack style={{fill: "white"}} size={24}/></button>
                                <button onClick={() => navigate(1)}><IoIosArrowRoundForward style={{fill: "white"}} size={24}/></button>
                            </div>
                            <div className={'w-1/2'}>
                                <Search/>
                            </div>
                        </div>
                        <div style={{display: "flex"}}>
                            <div className="dev_logout">
                                <button onClick={() =>{
                                    setCheck(!check)
                                }}>
                                    <img src={img} style={{
                                        width: 40,
                                        height: 40,
                                        marginTop: 5,
                                        marginLeft: 2,
                                        marginRight: 30,
                                        borderRadius: 20
                                    }} onClick={showModal}/>
                                </button>
                            </div>
                        </div>
                        <div className="form_menu">
                            <div>
                                <Modal
                                    style={{ top: "180px", right: "40px", position: 'fixed' }}
                                    width={350}
                                    visible={isModalVisible}
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                    footer={null}
                                >
                                    <MenuLogOut handler={handleCheck}/>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    } else {
        return (
            <div className={' flex justify-between w-full items-center border-none'} style={{zIndex: 100}}>
                <div className={'flex gap-6 w-full items-center'}>
                    <div className={'flex text-gray-400 gap-4'}>
                    <button onClick={() => navigate(-1)}><IoIosArrowRoundBack style={{fill: "white"}} size={24}/></button>
                        <button onClick={() => navigate(1)}><IoIosArrowRoundForward style={{fill: "white"}} size={24}/></button>
                    </div>
                    <div className={'w-1/2'}>
                        <Search/>
                    </div>
                </div>
                <div style={{display: "flex"}}>
                    <div className="dev_logout items-center mt-2 ml-2">
                        <button onClick={showModal}>
                        <span className="bg-red-500"><BiUser className="rounded-full p-2 text-gradient bg-gradient-to-r from-purple-100  via-blue-100 to-pink-200 " size={40}/></span>
                            <div/>
                        </button>
                    </div>
                </div>
                <div className="form_menu">
                    <div>
                        <Modal
                            style={{top: "10px", right: "30px", position: 'fixed'}}
                            width={350}
                            visible={isModalVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={null}
                        >
                            <MenuLogin handler={handleCheck}/>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header
