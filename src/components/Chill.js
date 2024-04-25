import banner1 from "../accsets/banner-1.jpg";
import banner2 from "../accsets/banner-2.jpg";
import banner3 from "../accsets/banner-3.jpg";
import {useNavigate} from "react-router-dom";
import ban1 from "../accsets/BannerAlbumHot/banner-album-hot-nhac-edm.jpg"
import ban2 from "../accsets/BannerAlbumHot/banner-album-hot-nhac-han.jpg"
import ban3 from "../accsets/BannerAlbumHot/banner-album-hot-nhac-pop-au-my.jpg"
import ban4 from "../accsets/BannerAlbumHot/banner-album-hot-nhac-tre.jpg"
import ban5 from "../accsets/BannerAlbumHot//banner-album-hot-rap-viet.jpg"
import {useEffect, useState} from "react";
import axios from "axios";
import {keys} from "lodash";

const Chill = () => {
    const navigate = useNavigate()
    const [songType, setSongType] = useState([])
    // useEffect(() => {
    //     axios.get("http://localhost:8080/songTypes").then((res) => {
    //         setSongType(res.data)
    //     })
    // }, []);

    return (
        <div className={'mt-12 px-[59px] flex flex-col gap-5'}>
            <div className={'flex items-center justify-between'}>
                <h3 className={'text-[20px] font-bold text-white'}>List nhạc chill cuối tuần</h3>
                <span className={'text-xs text-white'}>TẤT CẢ</span>
            </div>
            <div className={'flex items-start justify-between gap-[50px]'}>
                <div className={'flex gap-2 flex-auto text-sm justify-between'}>
                    {/*{songType.map((i, keys) =>{*/}
                    {/*    return(*/}
                    {/*        <div*/}
                    {/*            onClick={() => {*/}
                    {/*                navigate('/viewSongByType/' + i.id)*/}
                    {/*            }}*/}
                    {/*            className={'flex flex-col items-center flex-cols-4 gap-4'}>*/}
                    {/*            <img src={i.url_img == null? ban2 : i.url_img} alt="" className={'w-[200px] h-[200px] object-contain rounded-lg cursor-pointer'}/>*/}
                    {/*            <span className={'font-bold text-white mt-2'}>{i.name}</span>*/}
                    {/*        </div>*/}
                    {/*    )*/}
                    {/*})}*/}
                </div>
            </div>
        </div>
    )
}
export default Chill