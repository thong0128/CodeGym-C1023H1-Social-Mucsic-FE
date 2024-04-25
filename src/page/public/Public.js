import {Outlet} from "react-router-dom";
import SidebarLeft from "../../components/SidebarLeft";
import Player from "../../components/Player";
import { Scrollbars } from 'react-custom-scrollbars-2';
import Header from "../../components/Header";
import {useState} from "react";


const Public = () => {
    const [idSong, setIdSong] = useState()
    return (
        <div className='w-full relative h-screen flex flex-col bg-main-300' >
            <div className='w-full h-full flex flex-auto'>
                <div className='w-[240px] h-full flex-none border border-blue-500' style={{backgroundColor:"#493A60FF", color: "white"}}>
                    <SidebarLeft />
                </div>
                <div className='flex-auto flex flex-column border border-blue-500'>
                    <div className={'h-[70px] flex-none px-[59px] flex items-center '} style={{backgroundColor:"#32244DFF", color: "white"}}>
                        <Header/>
                    </div >
                    <div className={'flex-auto w-full h-[1000vh]'} style={{backgroundColor:"#3C2C52FF"}}>
                        <Scrollbars autoHide style={{width:'100%', height:'100%'}}>
                            <Outlet />
                        </Scrollbars>
                    </div>

                </div>
            </div>
            <div className='fixed bottom-0 left-0 right-0 h-[108px]'>
                <Player idSong={idSong}/>
            </div>
        </div>
    )
}
export default Public
