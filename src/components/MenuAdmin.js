import React from 'react';
import "../css_component/MenuLogoutCSS.css"
import {CiSettings} from "react-icons/ci";
import {TbPasswordUser} from "react-icons/tb";
import {HiOutlinePlus} from "react-icons/hi";
import {AiOutlineLogout} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import UpdatePass from "../page/public/UpdatePassword";
import ModalCreateTypeSong from "./ModalCreateTypeSong";
    const MenuAdmin = ({handler}) => {
    const navigate = useNavigate()
    function logOut() {
        localStorage.clear()
        handler(false);
        navigate("/")
    }
    function userList(){
        handler(false);
        navigate("/userList")
    }
    return (
        <>
            <div className="menu-logout">
                <ul>
                    <li onClick={userList}>
                        <div className="use-icon">
                            <CiSettings style={{width:20, height:20}} />
                        </div>
                        <div className="use-content">
                            Quản lý người dùng
                        </div>
                    </li>
                    <li>
                        <div className="use-icon">
                            <TbPasswordUser style={{width:20, height:20}} />
                        </div>
                        <div className="use-content">
                            Thay đổi mật khẩu
                        </div>
                    </li>
                    <li>
                        <div className="use-icon">
                            <TbPasswordUser style={{width:20, height:20}} />
                        </div>
                        <div className="use-content">
                            <ModalCreateTypeSong/>
                        </div>
                    </li>
                    <li onClick={logOut}>
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

export default MenuAdmin;