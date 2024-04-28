import {useNavigate} from "react-router-dom";

import {useEffect, useState} from "react";


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