
import icons from "../untis/icons";
import {Link, useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {findSongByAuthor, findSongBySinger, findSongByTitle} from "../service/SongService";
const {AiOutlineSearch} =icons
const Search = () => {

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
                <Form>
                    <div className='w-full flex items-center'>
                        <span
                            className='h-10 pl-4 bg-[#DDE4E4] flex items-center justify-center rounded-l-[20px] text-gray-500'>
                        <AiOutlineSearch size={24}/>
                    </span>
                        <Field
                            type="text"
                            className='outline-none px-4 bg-[#DDE4E4] py-2 w-full rounded-r-[20px] h-10 text-gray-500'
                            placeholder='Tìm kiếm bài hát, nghệ sĩ, tác giả...'
                            name="searchInput"
                        />
                    </div>
                </Form>
            </Formik>
        </>
    )
}

export default Search