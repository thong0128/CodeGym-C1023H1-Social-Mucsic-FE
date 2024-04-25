import banner1 from "../accsets/banner-1.jpg";
import banner2 from "../accsets/banner-2.jpg";
import banner3 from "../accsets/banner-3.jpg";
import {useNavigate} from "react-router-dom";
import cs1 from "../accsets/BannerSinger/banner-g5-squad.jpg"
import cs2 from "../accsets/BannerSinger/banner-jack-97.jpg"
import cs3 from "../accsets/BannerSinger/banner-ho-quang-hieu.jpg"
import cs4 from "../accsets/BannerSinger/banner-son-tung-mtp.jpg"
import cs5 from "../accsets/BannerSinger/banner-phan-manh-quynh.jpg"

const Hot = () => {
    const navigate = useNavigate()
    return (
        <div className={'mt-12 px-[59px] flex flex-col gap-5'}>
            <div className={'flex items-center justify-between'}>
                <h3 className={'text-[20px] font-bold text-white'}>Ca sĩ đươc yêu thích</h3>
                <span className={'text-xs text-white'}>TẤT CẢ</span>
            </div>
            <div className={'flex items-start justify-between gap-[50px]'}>
                <div className={'flex gap-2  flex-auto text-sm justify-between cursor-pointer'}>
                    <div
                        onClick={() => {
                            navigate('/showListByNameSinger/'+ "G5R Squad" )
                        }}
                        className={'flex flex-col items-center'}>
                        <img src={cs1} alt="" className={'w-[200px] h-[200px] object-contain rounded-lg'}/>
                        <span className={'font-bold text-white mt-2'}>G5R Squad</span>
                        <span className={' text-white'}></span>
                    </div>
                    <div
                        onClick={() => {
                            navigate('/showListByNameSinger/'+ "J97")
                        }}
                        className={'flex flex-col items-center cursor-pointer'}>
                        <img src={cs2} alt="" className={'w-[200px] h-[200px] object-contain rounded-lg'}/>
                        <span className={'font-bold text-white mt-2'}>J97</span>
                        <span className={' text-white'}></span>
                    </div>
                    <div
                        onClick={() => {
                            navigate("/showListByNameSinger/"+"Hồ Quang Hiếu")
                        }}
                        className={'flex flex-col items-center cursor-pointer'}>
                        <img src={cs3} alt="" className={'w-[200px] h-[200px] object-contain rounded-lg'}/>
                        <span className={'font-bold text-white mt-2'}>Hồ Quang Hiếu</span>
                        <span className={' text-white'}></span>
                    </div>
                    <div
                        onClick={() => {
                            navigate("/showListByNameSinger/" + "Sơn Tùng MTP")
                        }}
                        className={'flex flex-col items-center cursor-pointer'}>
                        <img src={cs4} alt="" className={'w-[200px] h-[200px] object-contain rounded-lg'}/>
                        <span className={'font-bold text-white mt-2'}>Sơn Tùng MTP</span>
                        <span className={' text-white'}></span>
                    </div>
                    <div
                        onClick={() => {
                            navigate('/showListByNameSinger/'+"Phan Mạnh Quỳnh")
                        }}
                        className={'flex flex-col items-center cursor-pointer'}>
                        <img src={cs5} alt="" className={'w-[200px] h-[200px] object-cover rounded-lg'}/>
                        <span className={'font-bold text-white mt-2 '}>Phan Mạnh Quỳnh</span>
                        <span className={'flex flex-col text-white'}></span>
                    </div>
                </div>
            </div>
            <div className={'h-[100px]'}>

            </div>
        </div>
    )
}
export default Hot