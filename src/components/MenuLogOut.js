import React, {useState} from 'react';
import "../css_component/MenuLogoutCSS.css"
import {CiSettings} from "react-icons/ci";
import {TbPasswordUser} from "react-icons/tb";
import {HiOutlinePlus} from "react-icons/hi";
import {AiOutlineLogout} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {RiFolderMusicLine} from "react-icons/ri";
import {BiSolidPlaylist} from "react-icons/bi";
import {FiUpload} from "react-icons/fi";
import ModalCreatePlayList from "./ModanCreatePlayList";
import {Button, Modal} from "antd";

const MenuLogOut = ({handler}) => {
    const navigate = useNavigate()
    function logOut() {
        handler(false);
        localStorage.clear()
        navigate("/")
    }
    function updatePassword(){
        handler(false);
        navigate("/updatePassword")
    }
    function updateProfile(){
        handler(false);
        navigate("/updateProfile")
    }

    function createSong(){
        handler(false);
        navigate("/create")
    }
    function showListSong(){
        handler(false);
        navigate('/showList')
    }

    function showPlayLists(){
        handler(false);
        navigate("/showPlaylist")
    }


    return (
        <>
            <div className="menu-logout py-2 px-2">
                <ul>
                    <li role="button" onClick={updateProfile}>
                        <div className="use-icon">
                            <CiSettings style={{width: 20, height: 20}}/>
                        </div>
                        <div className="use-content">
                            Sửa thông tin
                        </div>
                    </li>
                    <li role="button" onClick={updatePassword}>
                        <div className="use-icon">
                            <TbPasswordUser style={{width: 20, height: 20}}/>
                        </div>
                        <div className="use-content">
                            Thay đổi mật khẩu
                        </div>
                    </li>
                    <li role="button" onClick={createSong}>
                        <div className="use-icon">
                            <FiUpload style={{width: 20, height: 20}}/>
                        </div>
                        <div className="use-content">
                            Tải lên
                        </div>
                    </li>
                    <li role="button" onClick={showListSong}>
                        <div className="use-icon">
                            <RiFolderMusicLine style={{width: 20, height: 20}}/>
                        </div>
                        <div className="use-content">
                            Nhạc của tôi
                        </div>
                    </li>
                    <li role="button" onClick={showPlayLists}>
                        <div className="use-icon">
                            <BiSolidPlaylist style={{width: 20, height: 20}}/>
                        </div>
                        <div className="use-content">
                            D/S PlayList
                        </div>
                    </li>
                    <li role="button" onClick={logOut}>
                        <div className="use-icon">
                            <AiOutlineLogout style={{width: 20, height: 20}}/>
                        </div>
                        <div className="use-content">
                            LogOut
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default MenuLogOut;