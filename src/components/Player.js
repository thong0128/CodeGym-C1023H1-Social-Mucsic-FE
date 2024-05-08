import {useSelector} from "react-redux";
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
    const [indexSong, setIndexSong] = useState(3)
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

    const [loaded, setLoaded] = useState(0);
    const [duration, setDuration] = useState(0);
    const [played, setPlayed] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const playerRef = useRef(null);

    console.log('---> playing', playing);
    console.log('---> seeking', seeking);
    console.log('---> played', played);
    console.log('---> duration', duration);
    useEffect(() => {
        axios.get("http://localhost:8080/songs").then((res) => {
            setListSong(res.data);
        })
    }, [isFlag]);


    useEffect(() => {
        console.log("current: ", currentSong)
        console.log("img:", urlImg)
        setUrl(currentSong.song_url);
        setUrlImg(currentSong.img_url);
        setNameSong(currentSong.title);
        setSinger(currentSong.singer)
    }, [currentSong])
    const transferNextSong = () => {
        if (indexSong < listSong.length && indexSong >= 0) {
            setIndexSong(indexSong + 1)
            setUrl(listSong[indexSong].song_url);
            setUrlImg(listSong[indexSong].img_url);
            setNameSong(listSong[indexSong].title);
            setSinger(listSong[indexSong].singer);
        } else {
            setIndexSong(0)
        }
        console.log(indexSong);
    }
    const reverseNextSong = () => {
        if (indexSong < listSong.length && indexSong >= 0) {
            setIndexSong(indexSong - 1)
            setUrl(listSong[indexSong].song_url);
            setUrlImg(listSong[indexSong].img_url);
            setNameSong(listSong[indexSong].title);
            setSinger(listSong[indexSong].singer);
        } else {setIndexSong(0)}
        console.log(indexSong);
    }
    const handlePlay = () => {
        console.log('onPlay')
        setPlaying(true);
    }
    const handlePause = () => {
        console.log('onPause')
        setPlaying(false);
    }
    const handlePlayPause = () => {
        console.log('playing', playing);
        setPlaying(!playing);
    }
    const handleEnded = () => {
        console.log('onEnded')
        setPlaying(true);
    }
    const handleProgress = state => {
        setCurrentTime(state.playedSeconds)
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!seeking) {
            setPlayed(state.played);
        }
    }
    const handleDuration = (duration) => {
        console.log('onDuration', duration);
        setDuration(duration);
    }
    const handleSeekMouseDown = e => {
        setSeeking(true);
    }

    const handleSeekChange = e => {
        console.log('handleSeekChange', e.target.value);
        setPlayed(parseFloat(e.target.value));
    }

    const handleSeekMouseUp = e => {
        setSeeking(false);
        ref.current?.seekTo(parseFloat(e.target.value));
    }
    const handleVolumeChange = e => {
        console.log(e.target.value);
        setVolume(parseFloat(e.target.value))
    }

    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = Math.floor(value - minute * 60);
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }

    // const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
    // const lightIconColor =
    //     theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

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
                                <IconButton aria-label="previous song" onClick={reverseNextSong} size="medium">
                                    <FastRewindRounded fontSize="medium" htmlColor={'#fff'}/>
                                </IconButton>
                                <IconButton
                                    aria-label={playing ? 'pause' : 'play'}
                                    onClick={handlePlayPause}
                                    size="medium"
                                >
                                    {playing ? (
                                        <PauseRounded sx={{fontSize: '2.5rem'}} htmlColor={'#fff'}/>
                                    ) : (
                                        <PlayArrowRounded
                                            sx={{fontSize: '2.5rem'}}
                                            htmlColor={'#fff'}
                                        />
                                    )}
                                </IconButton>
                                <IconButton aria-label="next song" onClick={transferNextSong} size="medium">
                                    <FastForwardRounded fontSize="medium" htmlColor={'#fff'}/>
                                </IconButton>
                            </Box>
                            <input style={{
                                accentColor: 'white',
                                outline: 'none',
                                border: 'none',
                                height: '5px'
                                // palette: {
                                //     primary: {
                                //         main: '#c8e6c9',
                                //     },
                                //     secondary: "red",
                                // }
                            }}

                                   className="form-control-range"
                                   type='range' min={0} max={0.999999} step='any'
                                   value={played}
                                   onMouseDown={handleSeekMouseDown}
                                   onChange={handleSeekChange}
                                   onMouseUp={handleSeekMouseUp}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    mt: 1,
                                }}
                            >
                                <TinyText className="text-white">{formatDuration(duration * played)}</TinyText>
                                <TinyText className="text-white">{formatDuration(duration)}</TinyText>
                            </Box>
                        </Grid>
                        <Grid xs={2} sm={4} md={3}>
                            <Stack spacing={2} direction="row" sx={{mb: 1, px: 4, mt:2}} alignItems="center">
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
                onMouseUp={() => {playerRef.current.seekTo(parseFloat(currentTime))
                    console.log("thời gian", currentTime)}}
                onTouchEnd={() => {playerRef.current.seekTo(parseFloat(currentTime))
                    console.log("thời gian", currentTime)}}
            />
        </>
    );
}
export default Player