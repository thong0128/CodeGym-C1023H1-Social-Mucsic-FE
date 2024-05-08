import {useDispatch, useSelector} from "react-redux";
import {getArrSlider} from "../untis/fn";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import * as actions from '../store/actions'
import banner1 from '../accsets/banner-1.jpg'
import banner2 from '../accsets/banner-2.jpg'
import banner3 from '../accsets/banner-3.jpg'

const Slider = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const sliderEls = document.getElementsByClassName('slider-item')
        let min = 0
        let max = 2
        const intervalId = setInterval(() => {
            const list = getArrSlider(min, max, sliderEls.length - 1)
            for (let i = 0; i < sliderEls.length; i++) {

                sliderEls[i]?.classList?.remove('animate-slide-right', 'order-last', 'z-20')
                sliderEls[i]?.classList?.remove('animate-slide-left', 'order-first', 'z-10')
                sliderEls[i]?.classList?.remove('animate-slide-left2', 'order-2', 'z-10')


                if (list.some(item => item === i)) {
                    sliderEls[i].style.cssText = `display: block`
                } else {
                    sliderEls[i].style.cssText = `display: none`
                }
            }

            list.forEach(item => {
                if (item === max) {
                    sliderEls[item]?.classList?.add('animate-slide-right', 'order-last', 'z-20')
                } else if (item === min) {
                    sliderEls[item]?.classList?.add('animate-slide-left', 'order-first', 'z-10')
                } else {
                    sliderEls[item]?.classList?.add('animate-slide-left2', 'order-2', 'z-10')
                }
            })
            min = (min === sliderEls.length - 1) ? 0 : min + 1
            max = (max === sliderEls.length - 1) ? 0 : max + 1
        }, 3000)
        return () => {
            intervalId && clearInterval(intervalId)
        }
    }, [])
    return (
        <div className='w-full overflow-hidden px-[59px]'>
            <div className='flex w-full gap-8 pt-8'>
                    <img
                        onClick={()=>
                            navigate('album/'+1)
                        }
                        src={banner1}
                        className={'slider-item flex-1 object-contain w-[30%] rounded-lg cursor-pointer'}
                        alt=''/>
                <img
                    onClick={()=>
                        navigate('album/'+2)
                }
                    src={banner2}
                    className={'slider-item flex-1 object-contain w-[30%] rounded-lg cursor-pointer'}
                    alt=''/>
                <img
                    onClick={()=>
                        navigate('album/'+3)
                    }
                    src={banner3}
                    className={'slider-item flex-1 object-contain w-[30%] rounded-lg cursor-pointer'}
                    alt=''/>
            </div>
        </div>
    )
}
export default Slider

