
import logo from '../accsets/logo.svg'
import {NavLink, useNavigate} from "react-router-dom";
import {sidebarMenu} from "../untis/menu";
import path from "../untis/path";
const notActiveStyle = 'py-2 px-[25px] font-bold text-[#32323D] text-[13px]  flex gap-[12px] items-center'
const activeStyle ='py-2 px-[25px] font-bold text-[#0F7070] text-[13px]  flex gap-[12px] items-center'
const SidebarLeft = () => {
    const naviagte = useNavigate()
    return (
        <div onClick={() => naviagte(path.HOME)} className={'flex h-full flex-col bg-[#DDE4E4]'} style={{backgroundColor: '#493A60FF'}}>
            <div className={'w-full h-[70px] py-[15px] px-[25px] flex justify-start items-center cursor-pointer'}>
                <img src={logo} alt="" className={'w-[120px] h-10'}/>
            </div>
            <div className={'flex flex-col'} >
                {sidebarMenu.map(item => (
                    <NavLink to={item.path}
                             key={item.path}
                             end={item.end}
                             className= {({isActive}) => isActive ? activeStyle : notActiveStyle } >
                        {item.icons}
                        <span style={{color: "white"}}>{item.text}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default SidebarLeft