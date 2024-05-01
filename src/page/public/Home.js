import Slider from "../../components/Slider";
import {Chill, NewRelease} from "../../components";
import Hot from "../../components/Hot";

const Home = () =>{
    return (
        <div className={'overflow-y-auto w-full'}>
            <Slider/>
            <NewRelease/>
            {/*<Sections data={top100}/>*/}
            {/*<Sections data={xone}/>*/}
            {/*<Sections data={newMusic}/>*/}
            <Chill/>
            <Hot/>
        </div>
    )
}
export default Home