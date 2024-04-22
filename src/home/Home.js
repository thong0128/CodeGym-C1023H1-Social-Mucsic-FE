import * as React from 'react';
import './home.css'
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";
import {Outlet} from "react-router-dom";
import Content from "../components/Content";

export default function Home() {

    return(
       <>
           <div className={"w-full flex"}>
               <div className='w-[240px] flex-none'>
                   <SidebarLeft></SidebarLeft>
               </div>

               <div className='flex-auto'>
                   <Content></Content>
               </div>

               <div className='w-[330px] flex-none'>
                   <SidebarRight></SidebarRight>
               </div>



           </div>

       </>
    )
};
