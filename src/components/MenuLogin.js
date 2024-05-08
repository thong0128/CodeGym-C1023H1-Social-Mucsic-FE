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
            <div className="menuLogin py-[18px] mt-14">
                <div onClick={login} className="login mx-[18px]">
                    <button className= "button justify-center text-base font-semibold">
                        Đăng nhập
                    </button>
                </div>
                <div className="menuLogin_content my-2 mx-[18px] font-bold">
                    Đăng ký gói
                </div>
                <div className="voucher1 p-[16px]  mx-[18px] mt-2 mb-[15px]">
                    <div className="flex">
                         <span className="text-2xl text-f text-violet-500 font-semibold">
                        ZingMP3
                    </span>
                        <div
                            className="mx-2 h-[22px] text-f text-base px-2 rounded-lg bg-[#9457ff] text-white my-auto font-semibold">PLUS
                        </div>
                    </div>
                    <h3 className="text-black font-bold text-f mt-2">
                        Chỉ từ 8.000 đ/tháng
                    </h3>
                    <h3 className="my-1.5">
                        Nghe nhạc với chất lượng cao nhất, không quảng cáo
                    </h3>
                    <button className="mt-2 p-2 rounded-full bg-[#8e4cff] text-white text-f font-semibold">
                        Tìm hiểu thêm
                    </button>

                </div>
                <div className="voucher2 p-[16px] mx-[18px]">
                    <div className="flex">
                         <span className="text-2xl text-f text-[#dca519] font-semibold">
                        ZingMP3
                    </span>
                        <div className="mx-2 h-[22px] text-f text-base px-2 rounded-lg bg-[#e5ac1a] text-white my-auto font-semibold">PREMIUM</div>
                    </div>
                    <h3 className="text-black font-bold text-f mt-2">
                        Chỉ từ 14.000 đ/tháng
                    </h3>
                    <h3 className="text-gray-700 my-1.5">
                        Toàn bộ đặc quyền Plus cùng kho nhạc premium
                    </h3>
                    <button className="mt-2 p-2 rounded-full bg-[#dca519] text-white text-f font-semibold">
                        Tìm hiểu thêm
                    </button>
                </div>
            </div>
        </>
    );
};

export default MenuLogin;
