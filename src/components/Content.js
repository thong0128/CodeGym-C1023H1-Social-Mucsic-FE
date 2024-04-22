import Header from "./Header";

export default function Content(){
    return(
        <div className='overflow-y-auto '>
            <div className='h-[70px] px-[60px] flex items-center' >
                <Header></Header>
            </div>
        </div>
    )
}