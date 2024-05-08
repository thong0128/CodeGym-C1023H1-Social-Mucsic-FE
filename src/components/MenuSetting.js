import React from 'react';
import {GrCircleInformation} from "react-icons/gr";
import {VscSymbolInterface} from "react-icons/vsc";
import {LiaAddressBook} from "react-icons/lia";
import {GoArrowUpRight} from "react-icons/go";
import {IoShieldCheckmarkOutline} from "react-icons/io5";
import {PiFlag} from "react-icons/pi";
import {SlArrowRight} from "react-icons/sl";
import "../css_component/menuSetting.css"
import {useNavigate} from "react-router-dom";
import {HiOutlinePlus} from "react-icons/hi";
import {RiSlideshow2Line} from "react-icons/ri";
import ModalCreatePlayList from "./ModanCreatePlayList";


const MenuSetting = ({handler}) => {
    const navigate = useNavigate();
    function showList(){
        handler(false);
        navigate("/showPlaylist")
    }

    return (
        <>
            <div className="menu_setting">
                <ul className="form_menu">
                    <li className= "li-form">
                            <div className="icon">
                                <VscSymbolInterface />
                            </div>
                            <div className="content" style={{}}>
                                Giao diện
                            </div>
                            <div className="icon" style={{marginLeft:"auto"}}>
                                <SlArrowRight />
                            </div>
                    </li>
                    <div className= "vach"></div>
                    <li>
                        <div className="icon">
                            <GrCircleInformation />
                        </div>
                        <div className="content">
                            Giới thiệu
                        </div>
                    </li>
                    <li>
                        <div className="icon">
                            <LiaAddressBook />
                        </div>
                        <div className="content">
                            Thỏa thuận sử dụng
                        </div>
                        <div className="icon" style={{marginLeft:"auto"}}>
                            <GoArrowUpRight />
                        </div>
                    </li>
                    <li>
                        <div className="icon">
                            <IoShieldCheckmarkOutline />
                        </div>
                        <div className="content">
                            Chính sách bảo mật
                        </div>
                        <div className="icon" style={{marginLeft:"auto"}}>
                            <GoArrowUpRight />
                        </div>
                    </li>
                    <li>
                        <div className="icon">
                            <PiFlag />
                        </div>
                        <div className="content">
                            Báo cáo vi phạm bản quyền
                        </div>
                        <div className="icon" style={{marginLeft:"auto"}}>
                            <GoArrowUpRight />
                        </div>
                    </li>
                    <li onClick={showList}>
                        <div className="icon">
                            <RiSlideshow2Line />
                        </div>
                        <div className="content">
                            D/S PlayList
                        </div>
                        <div className="icon" style={{marginLeft:"auto"}}>
                            <GoArrowUpRight />
                        </div>
                    </li>
                    <li onClick={()=>{
                        handler(false)
                        navigate("/createPlayList")
                    }}>
                        <div className="icon">
                            <HiOutlinePlus />
                        </div>
                        <div className="content">
                            <ModalCreatePlayList/>
                        </div>
                        <div className="icon" style={{marginLeft:"auto"}}>
                            <GoArrowUpRight/>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default MenuSetting;