import React from 'react';
import "../css_component/menuLogin.css"
import {useNavigate} from "react-router-dom";

const MenuLogin = ({ handler }) => {
    const navigate = useNavigate()
    function login() {
        handler(false);
        navigate("/login")
    }
    return (
        <>
            <div className="menuLogin">
                <div onClick={login} className="login">
                    <button className= "button">
                        Login
                    </button>
                </div>
                <div className="menuLogin_content">
                    Đăng ký gói
                </div>
                <div className="voucher1">
                    <h2>
                        ZingMP3
                    </h2>
                    <h3>
                        Chỉ từ 11.000 đ/tháng
                    </h3>
                    <h3>
                        Nghe nhạc với chất lượng cao nhất, không quảng cáo
                    </h3>
                    <a>Tìm hiểu thêm</a>
                </div>
                <div className="voucher2">
                    <h2>
                        ZingMP3
                    </h2>
                    <h3>
                        Chỉ từ 37.500 đ/tháng
                    </h3>
                    <h3>
                        Toàn bộ đặc quyền Plus cùng kho nhạc premium
                    </h3>
                    <a>Tìm hiểu thêm</a>
                </div>
            </div>
        </>
    );
};

export default MenuLogin;
