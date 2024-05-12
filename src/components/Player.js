import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState, useRef, useContext} from "react";
import ReactPlayer from "react-player";
import axios from "../axios";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import {styled, useTheme} from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import {AppContext} from "../Context/AppContext";
import {findAllSong, newSongsList} from "../service/SongService";
import songItem from "./SongItem";
import {setCurSongId} from "../store/actions";
import {BsPauseCircle, BsPlayCircle} from "react-icons/bs";

const WallPaper = styled('div')({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    overflow: 'hidden',
    background: '#130c1c',
    transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
    '&:before': {
        content: '""',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '-10%',
        right: '-50%',
        background:
            '#130c1c',
    },
    '&:after': {
        content: '""',
        width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: '-20%',
        left: '-30%',
        background:
            '#130c1c',
        transform: 'rotate(30deg)',
    },
});

const Widget = styled('div')(({theme}) => ({
    padding: 10,
    borderRadius: 0,
    width: '100%',
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : '#130c1c',
    backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
    width: 80,
    height: 80,
    objectFit: 'cover',
    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
        width: '100%',
    },
});

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.5,
    fontWeight: 500,
    letterSpacing: 0.2,
});

const Player = (prop) => {
    const ref = useRef(null);
    const theme = useTheme();
    const [indexSong, setIndexSong] = useState()
    const currentSong = useSelector((store) => {
        return store.songStore.song;
    })
    const [listSong, setListSong] = useState([])
    const [url, setUrl] = useState(currentSong?.song_url);
    const [urlImg, setUrlImg] = useState(currentSong?.img_url);
    const [volume, setVolume] = useState(0.8);
    const [playing, setPlaying] = useState(true);
    const [seeking, setSeeking] = useState(false);
    const [nameSong, setNameSong] = useState(currentSong?.nameSong);
    const [singer, setSinger] = useState(currentSong?.singer);
    const {isFlag} = useContext(AppContext);
    const dispatch = useDispatch();

    const [loaded, setLoaded] = useState(0);
    const [duration, setDuration] = useState(0);
    const [played, setPlayed] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const playerRef = useRef(null);
    const idPll = localStorage.getItem("idPll");
    const location = localStorage.getItem("location");


    //set list songs theo cac loai
    const listSongAll = useSelector((store)=>{return store.songStore.songs});
    const listSongNew = useSelector((store)=>{return store.songStore.songsLates});
    const listSongHot = useSelector((store)=>{return store.songStore.songHot});
    const listSongFavorite = useSelector((store)=>{return store.songStore.favoriteSongs});
    const listSongByPll = useSelector((store)=>{return store.songStore.songsByPll});

    //set listSong theo vi tri bai hat
    useEffect(() => {
        switch (location) {
            case 'newSongs' :
                setListSong(listSongNew);
                break;
            case 'hotSongs':
                setListSong(listSongHot);
                break;
            case 'favoriteSongs' :
                setListSong(listSongFavorite);
                break;
            case 'playlistSongs':
                setListSong(listSongByPll);
                break;
            default:
                setListSong(listSongAll);
        }
    }, [currentSong, location, idPll]);

    //set thong tin bai hat cho player
    useEffect(() => {
        setUrl(currentSong.song_url);
        setUrlImg(currentSong.img_url);
        setNameSong(currentSong.title);
        setSinger(currentSong.singer)
        for (let i = 0; i<listSong.length; i++){
            if (listSong[i].id === currentSong.id){
                setIndexSong(i);
                break;
            }
        }
    }, [currentSong, listSong])


    const transferNextSong = () => {
        let newIndex = indexSong + 1; // Calculate the next index
        if (newIndex >= listSong.length) {
            newIndex = 0; // Loop back to the first song
        }
        setIndexSong(newIndex);
        setUrl(listSong[newIndex].song_url);
        setUrlImg(listSong[newIndex].img_url);
        setNameSong(listSong[newIndex].title);
        setSinger(listSong[newIndex].singer);
    }
    const reverseNextSong = () => {
        let newIndex = indexSong - 1; // Calculate the previous index
        if (newIndex < 0) {
            newIndex = listSong.length - 1; // Loop to the last song
        }
        setIndexSong(newIndex);
        setUrl(listSong[newIndex].song_url);
        setUrlImg(listSong[newIndex].img_url);
        setNameSong(listSong[newIndex].title);
        setSinger(listSong[newIndex].singer);
    }
    const handlePlay = () => {
        // console.log('onPlay')
        setPlaying(true);
    }
    const handlePause = () => {
        // console.log('onPause')
        setPlaying(false);
    }
    const handlePlayPause = () => {
        // console.log('playing', playing);
        setPlaying(!playing);
    }
    const handleEnded = () => {
        // console.log('onEnded')
        setPlaying(true);
    }
    const handleProgress = state => {
        setCurrentTime(state.playedSeconds)
        // console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!seeking) {
            setPlayed(state.played);
        }
    }
    const handleDuration = (duration) => {
        // console.log('onDuration', duration);
        setDuration(duration);
    }
    const handleSeekMouseDown = e => {
        setSeeking(true);
    }

    const handleSeekChange = e => {
        // console.log('handleSeekChange', e.target.value);
        setPlayed(parseFloat(e.target.value));
    }

    const handleSeekMouseUp = e => {
        setSeeking(false);
        ref.current?.seekTo(parseFloat(e.target.value));
    }
    const handleVolumeChange = e => {
        // console.log(e.target.value);
        setVolume(parseFloat(e.target.value))
    }

    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = Math.floor(value - minute * 60);
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }


    return (
        <>
            <Box sx={{width: '100%', overflow: 'hidden', paddingBottom:'15px'}}>
                <Widget style={{ borderTopColor: '#2b2533', borderTopWidth: '1px', borderTopStyle: 'solid' }}>
                    <Grid container spacing={{xs: 2, md: 20}} columns={{xs: 4, sm: 8, md: 12}}>
                        <Grid xs={2} sm={4} md={3}>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <CoverImage>
                                    <img
                                        alt="can't win - Chilling Sunday"
                                        src={urlImg == null ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" : urlImg}
                                    />
                                </CoverImage>
                                <Box sx={{ml: 1.5, minWidth: 0}}>
                                    <Typography className="text-white" fontSize={16}>
                                        {nameSong === null ? "Unknown" : nameSong}
                                    </Typography>
                                    <Typography className="text-gray-500" fontSize={12}>
                                        <b>{singer === null ? "Ca sĩ" : singer}</b>
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid xs={2} sm={4} md={6}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mt: -1,
                                    px:1,
                                }}
                            >
                                <IconButton aria-label="previous song" onClick={()=>reverseNextSong()} size="large">
                                    <FastRewindRounded fontSize="30px" htmlColor={'#f3f4f6'}/>
                                </IconButton>
                                <IconButton
                                    aria-label={playing ? 'pause' : 'play'}
                                    onClick={()=>handlePlayPause()}
                                    size="large"
                                >
                                    {playing ? (
                                        <BsPauseCircle className="text-gray-100 hover:text-purple-700" size={35} />
                                    ) : (
                                        <BsPlayCircle className="text-gray-100 hover:text-purple-700" size={35}
                                        />
                                    )}
                                </IconButton>
                                <IconButton aria-label="next song" onClick={()=>transferNextSong()} size="medium">
                                    <FastForwardRounded fontSize="30px" htmlColor={'#f3f4f6'}/>
                                </IconButton>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    mt: -1,
                                }}
                            >
                                <TinyText className="text-white w-[40px] text-center">{formatDuration(duration * played)}</TinyText>
                                <input style={{
                                    accentColor: 'white',
                                    outline: 'none',
                                    border: 'none',
                                    height: '5px'
                                }}

                                       className="form-control-range"
                                       type='range' min={0} max={0.999999} step='any'
                                       value={played}
                                       onMouseDown={handleSeekMouseDown}
                                       onChange={handleSeekChange}
                                       onMouseUp={handleSeekMouseUp}
                                />
                                <TinyText className="text-white w-[40px] text-center">{formatDuration(duration)}</TinyText>
                            </Box>
                        </Grid>
                        <Grid xs={2} sm={4} md={3}>
                            <Stack spacing={2} direction="row" sx={{mb: 1, px: 4, mt: 2}} alignItems="center">
                                <VolumeDownRounded htmlColor={'#fff'} sx={{fontSize: '1.2rem'}}/>
                                <Slider
                                    value={volume ?? 0.8}
                                    min={0}
                                    step={0.1}
                                    max={0.999999}
                                    onChange={handleVolumeChange}
                                    aria-label="Volume"
                                    sx={{
                                        width: 100,
                                        color: theme.palette.mode === 'dark' ? '#fff' : '#fff',
                                        '& .MuiSlider-track': {
                                            border: 'none',
                                        },
                                        '& .MuiSlider-thumb': {
                                            width: 12,
                                            height: 12,
                                            backgroundColor: '#fff',
                                            '&:before': {
                                                boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                                            },
                                            '&:hover, &.Mui-focusVisible, &.Mui-active': {
                                                boxShadow: 'none',
                                            },
                                        },
                                    }}
                                />
                                <VolumeUpRounded htmlColor={'#fff'} sx={{fontSize: '1.2rem'}}/>
                            </Stack>
                        </Grid>
                    </Grid>
                </Widget>
                <WallPaper/>
            </Box>
            <ReactPlayer
                ref={ref}
                url={url}
                playing={playing}
                controls={false}
                volume={volume}
                loop={true}
                onPlay={handlePlay}
                onPause={handlePause}
                onEnded={handleEnded}
                onProgress={handleProgress}
                onDuration={handleDuration}
                onSeek={(seconds) => setCurrentTime(seconds)}
                seekTo = {currentTime}
                onMouseUp={() => {playerRef.current.seekTo(parseFloat(currentTime))}}
                onTouchEnd={() => {playerRef.current.seekTo(parseFloat(currentTime))}}
            />
        </>
    );
}
export default Player