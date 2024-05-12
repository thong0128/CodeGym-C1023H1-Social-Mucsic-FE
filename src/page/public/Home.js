import Slider from "../../components/Slider";
import {NewRelease} from "../../components";
import Hot from "../../components/Hot";

const Home = () =>{
    return (
        <div className={'overflow-y-auto w-full'}>
            <Slider/>
            <NewRelease/>
            <Hot/>
        </div>
    )
}
export default Home