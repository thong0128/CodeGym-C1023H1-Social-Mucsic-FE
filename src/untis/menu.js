import icons from "./icons";
const { MdOutlineLibraryMusic,MdOutlineFeed,PiChartLine,TbChartArcs} =icons
export const sidebarMenu = [
    {
        path :'mymusic',
        text : 'Cá nhân',
        icons: <MdOutlineLibraryMusic style={{fill: 'white'}} size={24}/>
    },
    {
        path :'',
        text : 'Khám phá',
        end: true,
        icons: <TbChartArcs style={{fill: 'white'}} size={24}/>
    },
    {
        path :'zing-chart',
        text : '#zingchart',
        icons: <PiChartLine style={{fill: 'white'}} size={24}/>
    },
    {
        path :'follow',
        text : 'Theo dõi',
        icons: <MdOutlineFeed style={{fill: 'white'}} size={24}/>
    }

]
