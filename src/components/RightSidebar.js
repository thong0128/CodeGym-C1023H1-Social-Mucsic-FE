import React, {useEffect, useState} from 'react';
import { Button, Drawer } from 'antd';
import {IoTrashBin} from "react-icons/io5";
import {SongItem} from "./index";
import {useSelector} from "react-redux";
import {apiGetDetailPlaylist} from "../apis";
import axios from "axios";

const RightSidebar = () => {
    const [open, setOpen] = useState(false);
    const [a, setA] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const m1 = () => {
        setA(true)
    }

    const [isRecent, setisRecent] = useState(false)
    const {curSongData, curAlbumId} = useSelector(state => state.music)
    const {playlist, setPlaylist} = useState()
    const [songs, setSongs] = useState([])
    // useEffect(() => {
    //     axios.get("http://localhost:8080/songs/searchByIdPll/" + 1).then((res)=>{
    //         setSongs(res.data);
    //
    //     })
    // }, []);

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                Open
            </Button>
            <Drawer mask={false} autoFocus={false} title="Basic Drawer" placement="right" onClose={onClose} open={open}>
                <div className={"modal.hidden"}>
                    <div className={'flex flex-col text-xs w-full'}>
                        <div
                            className={'h-[70px] w-full flex-none py-[14px] px-2 gap-8 flex items-center justify-between'}>
                            <div
                                className={'flex  flex-auto gap-8 justify-center bg-main-200 rounded-l-full rounded-r-full py-[6px] px-[6px] cursor-pointer'}>
                    <span
                        onClick={() => setisRecent(prev => !prev)}
                        className={`py-[5px] ${!isRecent && 'bg-main-100'} flex-1 flex justify-choenter rounded-l-full rounded-r-full items-center`}
                    >
                        Danh sách phát</span>
                                <span
                                    onClick={() => setisRecent(prev => !prev)}
                                    className={`py-[5px] ${isRecent && 'bg-main-100'} flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
                                >
                        Nghe gần đây</span>
                            </div>
                            <span className={'p-2 rounded-full hover:bg-main-200 cursor-pointer'}><IoTrashBin
                                size={14}/></span>
                        </div>
                        <div className={'w-full flex-col flex px-2 '}>
                            {songs?.map(item => (
                                <SongItem
                                    sid={item.id}
                                    key = {item.id}
                                    thumbnail={item.url_img}
                                    title={item.nameSong}
                                    artists={item.singer}
                                    releaseDate={new Date()}

                                />
                            ))}

                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    );
};

export default RightSidebar;