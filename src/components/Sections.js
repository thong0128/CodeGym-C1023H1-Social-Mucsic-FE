
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

const Sections = ({data}) => {
    const navigate = useNavigate
    const [list, setList] = useState([]);
    const [check, setCheck] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/songs').then((res) => {
            return res.data
        }).catch(() => {
            setList([])
        })
    }, [check])

    const dataListSong = {}
    useEffect(() => {
        return dataListSong;
    }, [check]);

    function listNew(list) {
        let listNe = [];
        for (let i = 0; i < list.length; i++) {
            if (list[i].userName !== "admin") {
                listNe.push(list[i])
            }
        }
        return listNe;
    }

    return (
        <div className={'mt-12 px-[59px] flex flex-col gap-5'}>
            <div className={'flex items-center justify-between'}>
                {/*<h3 className={'text-[20px] font-bold text-white'}>{data?.title}</h3>*/}
                {/*<span className={'text-xs text-white'}>TẤT CẢ</span>*/}
            </div>
            <div className={'flex items-start justify-between gap-[28px]'}>
            </div>
        </div>
    )
}
export default Sections
