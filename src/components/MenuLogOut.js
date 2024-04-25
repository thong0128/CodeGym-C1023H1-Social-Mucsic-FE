import React from 'react';
import "../css_component/MenuLogoutCSS.css"
import {CiSettings} from "react-icons/ci";
import {TbPasswordUser} from "react-icons/tb";
import {HiOutlinePlus} from "react-icons/hi";
import {AiOutlineLogout} from "react-icons/ai";
import {useNavigate} from "react-router-dom";

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


    return (
        <>
            <div className="menu-logout">
                <ul>
                    <li role="button" onClick={updateProfile}>
                        <div className="use-icon">
                            <CiSettings style={{width:20, height:20}} />
                        </div>
                        <div className="use-content">
                            Sửa thông tin
                        </div>
                    </li>
                    <li role="button" onClick={updatePassword}>
                        <div className="use-icon">
                            <TbPasswordUser style={{width:20, height:20}} />
                        </div>
                        <div className="use-content">
                            Thay đổi mật khẩu
                        </div>
                    </li>
                    <li role="button" onClick={createSong}>
                        <div className="use-icon">
                            <HiOutlinePlus style={{width:20, height:20}} />
                        </div>
                        <div className="use-content">
                            Thêm bài hát
                        </div>
                    </li>
                    <li role="button" onClick={showListSong}>
                        <div className="use-icon">
                            <HiOutlinePlus style={{width:20, height:20}} />
                        </div>
                        <div className="use-content">
                            D/S bài hát
                        </div>
                    </li>
                    <li role="button" onClick={logOut}>
                        <div className="use-icon">
                            <AiOutlineLogout style={{width:20, height:20}}/>
                        </div>
                        <div className="use-content" >
                            LogOut
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default MenuLogOut;