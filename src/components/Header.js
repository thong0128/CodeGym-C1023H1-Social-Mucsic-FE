import icons from "../untis/icons";
import Search from "./Search";
import {Link, useNavigate} from "react-router-dom";
import {CiSettings} from "react-icons/ci";
import MenuLogin from "./MenuLogin";
import "../css_component/menuSetting.css"
import MenuSetting from "./MenuSetting";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import MenuLogOut from "./MenuLogOut";
import MenuAdmin from "./MenuAdmin";
import {FaRegCircleUser} from "react-icons/fa6";
import {AppContext} from "../Context/AppContext";

const {IoIosArrowRoundBack, IoIosArrowRoundForward, AiOutlineSearch} = icons
const Header = () => {
    const {isFlag } = useContext(AppContext);

    const navigate = useNavigate()
    const id = localStorage.getItem("idUser")
    let [user, setUser] = useState({})
    let [img,setImg] = useState('');

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
    // const dataUser = {}
    //
    // useEffect(() => {
    //     setUser(dataUser)
    //     setImg(dataUser.avatar)
    // }, [isFlag]);


    const [check, setCheck] = useState(false)
    const [checkSetting, setChecksetting] = useState(false)

    const handleCheck = (isCheck) => {
            setChecksetting(false);
        setCheck(isCheck);
    }
    // console.log(localStorage.getItem("role"))
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
                        <div className="dev_setting">
                            <button type="button text-white" onClick={() => {
                                setChecksetting(!checkSetting)
                                setCheck(false)
                            }}>
                                <CiSettings style={{width: 40, height: 40, marginTop: 5, fill: 'white'}}/>
                            </button>
                        </div>
                        <div className="dev_logout">
                            <button onClick={() =>{
                                setCheck(!check)
                                setChecksetting(false);
                            }

                            }>
                                <img src={img === null ? "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg":
                                 img} style={{
                                    width: 40,
                                    height: 40,
                                    marginTop: 5,
                                    marginLeft: 2,
                                    marginRight: 30,
                                    borderRadius: 20
                                }}/>
                            </button>
                        </div>
                    </div>
                    <div className="form_menu" >
                        <div style={{marginTop: "-91px" , position : 'absolute' , marginLeft: '-23.5%' ,height :'0px'}}>  {checkSetting ? <MenuSetting handler={handleCheck}></MenuSetting> : <></>}</div>
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
                            <div className="dev_setting" >
                                <button type="button text-white" onClick={() => {
                                    setChecksetting(!checkSetting)
                                        setCheck(false)
                                }}>
                                    <CiSettings style={{width: 40, height: 40, marginTop: 5, marginRight:20, fill: "white"}}/>
                                </button>
                            </div>
                            <div className="dev_logout">
                                <button onClick={() =>{
                                    setCheck(!check)
                                    setChecksetting(false);
                                }}>
                                    <img src={img === null ? "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg":
                                        img} style={{
                                        width: 40,
                                        height: 40,
                                        marginTop: 5,
                                        marginLeft: 2,
                                        marginRight: 30,
                                        borderRadius: 20
                                    }}/>
                                </button>
                            </div>
                        </div>
                        <div className="form_menu" >
                            <div style={{marginTop: "-91px" , position : 'absolute' , marginLeft: '-23.5%' ,height :'0px'}}>  {checkSetting ? <MenuSetting handler={handleCheck}></MenuSetting> : <></>}</div>
                            <div style={{marginTop: "149px" , position : 'absolute' , marginLeft: '-14%' ,height :'0px'}}> {check ? <MenuLogOut handler={handleCheck}></MenuLogOut> : <></>}</div>
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
                    <div className="dev_setting items-center mt-2 ml-2">
                        <button type="button" onClick={() => {
                            setChecksetting(!checkSetting)
                            setCheck(false)
                        }}>
                            <span className={'text-white'}><CiSettings size={35}/></span>
                        </button>
                    </div>
                    <div className="dev_logout items-center mt-2 ml-2">
                        <button onClick={() =>{
                            setCheck(!check)
                            setChecksetting(false);
                        }

                        }><span className={'text-white'}><FaRegCircleUser size={35}/></span>
                            <div/>

                        </button>
                    </div>
                </div>
                <div className="form_menu" >
                    <div style={{marginTop: "-91px" , position : 'absolute' , marginLeft: '-23.5%' ,height :'0px'}}>  {checkSetting ? <MenuSetting handler={handleCheck}></MenuSetting> : <></>}</div>
                    <div style={{marginTop: "19px" , position : 'absolute' , marginLeft: '-17%' ,height :'0px'}}> {check ? <MenuLogin handler={handleCheck}></MenuLogin> : <></>}</div>
                </div>
            </div>
        )
    }
}

export default Header
