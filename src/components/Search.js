
import icons from "../untis/icons";
import {Link, useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {findSongByAuthor, findSongBySinger, findSongByTitle} from "../service/SongService";
import {useState} from "react";
const {AiOutlineSearch} =icons
const Search = () => {
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const dispatch = useDispatch()
    function searchByTitle(value) {
        dispatch(findSongByTitle(value.searchInput))
    }
    function searchBySinger(value) {
        dispatch(findSongBySinger(value.searchInput))
    }
    function searchByAuthor(value) {
        dispatch(findSongByAuthor(value.searchInput))
    }

    const navigate = useNavigate();
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleSubmit = (values) => {
        searchByTitle(values);
        searchBySinger(values);
        searchByAuthor(values);
        navigate('/fill');
    };
    return (
        <>
            <Formik
                initialValues={{
                    searchInput: "",
                }}
                enableReinitialize={true}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({values})=>(
                    <Form>
                        <div className={`w-full flex items-center rounded-3xl ${isFocused? 'bg-[#34224f]' : 'bg-[#2f2739]'}`}>
                        <span
                            className='h-10 px-[16px] flex items-center justify-center rounded-l-[20px] text-slate-200'>
                        <AiOutlineSearch size={24}/>
                    </span>
                            <Field
                                type="text"
                                className={`outline-none py-2 w-full rounded-r-[20px] h-10 text-slate-200 text-f ${isFocused? 'bg-[#34224f]' : 'bg-[#2f2739]'}`}
                                placeholder='Tìm kiếm bài hát, nghệ sĩ, tác giả...'
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                name="searchInput"
                            />
                        </div>
                    </Form>
                )

                }

            </Formik>
        </>
    )
}

export default Search