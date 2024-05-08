
import logo from '../accsets/logo.svg'
import {NavLink, useNavigate} from "react-router-dom";
import {sidebarMenu} from "../untis/menu";
import path from "../untis/path";
import React, {useState} from "react";
import {Modal} from "antd";
import ModalCreatePlayList from "./ModanCreatePlayList";
import {HiOutlinePlus} from "react-icons/hi";
import {IoCloseOutline} from "react-icons/io5";
const notActiveStyle = 'py-2 px-[25px] font-bold text-[#32323D] text-[13px]  flex gap-[12px] items-center'
const activeStyle ='py-2 px-[25px] font-bold text-[#0F7070] text-[13px]  flex gap-[12px] items-center'
const SidebarLeft = () => {
    const naviagte = useNavigate()
    const id = localStorage.getItem("idUser");
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
        <div className={'flex h-full flex-col'}
             style={{backgroundColor: '#231b2e'}}>
            <div className={'w-full h-[70px] py-[15px] px-[25px] flex justify-start items-center cursor-pointer'}>
                <img src={logo} alt="" className={'w-[120px] h-10'} onClick={() => naviagte(path.HOME)}/>
            </div>
            <div className={'flex flex-col'}>
                {sidebarMenu.map(item => (
                    <NavLink to={item.path}
                             key={item.path}
                             end={item.end}
                             className={({isActive}) => isActive ? activeStyle : notActiveStyle}>
                        {item.icons}
                        <span style={{color: "white"}}>{item.text}</span>
                    </NavLink>
                ))}
            </div>
            {id ? <div className="w-full h-full py-[15px] px-[25px] grid grid-rows-4 items-center cursor-pointer">
                <div className="h-[40px] p-2 " onClick={showModal}>
                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <div className="flex-row">
                        <div className="items-center ml-2 text-slate-300 ">
                            <HiOutlinePlus style={{width: 20, height: 20}}/>
                        </div>
                        <div className="items-center ml-2 text-slate-300 text-f">
                            Tạo playlist mới
                        </div>
                    </div>
                </div>
            </div> : <></>}

            <div>
                <Modal
                    width={350}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                    closeIcon={<IoCloseOutline size={24} style={{ color: 'white' }} />}
                >
                    <ModalCreatePlayList handler={handleCheck}/>
                </Modal>
            </div>
        </div>
    )
}

export default SidebarLeft