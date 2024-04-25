
import icons from "../untis/icons";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {toast} from "react-toastify";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {searchByName} from "../service/SongService";
const {AiOutlineSearch} =icons
const Search = () => {
    let navigate = useNavigate();
    let [idSong,setIdSong] = useState()
    const dispatch = useDispatch()
    function searchByNameSong(value) {
        dispatch(searchByName(value.nameSong))
    }
    return (
        <>
            <Formik initialValues={{
                nameSong: "",
            }}
                    enableReinitialize={true}
                    onSubmit={(value) => {
                        searchByNameSong(value)
                        console.log(value)
                    }}>
                <Form>
                    <div className='w-full flex items-center'>
                            <span className='h-10 pl-4 bg-[#DDE4E4] flex items-center justify-center rounded-l-[20px] text-gray-500'>
                                <AiOutlineSearch size={24}/>
                            </span>
                        <Field
                            type="text"
                            className='outline-none px-4 bg-[#DDE4E4] py-2 w-full rounded-r-[20px] h-10 text-gray-500'
                            placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
                            name="nameSong"
                        />
                        <button>
                        </button>
                    </div>
                </Form>
            </Formik>
        </>
    )
}

export default Search