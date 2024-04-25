import {useSelector} from "react-redux";
import {useEffect, useState, useRef} from "react";
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
import Paper from '@mui/material/Paper';

const WallPaper = styled('div')({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    overflow: 'hidden',
    background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
    transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
    '&:before': {
        content: '""',
        width: '140%',
        height: '140%',
        position: 'absolute',
        top: '-40%',
        right: '-50%',
        background:
            'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
    },
    '&:after': {
        content: '""',
        width: '140%',
        height: '140%',
        position: 'absolute',
        bottom: '-50%',
        left: '-30%',
        background:
            'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
        transform: 'rotate(30deg)',
    },
});

const Widget = styled('div')(({theme}) => ({
    padding: 4,
    borderRadius: 0,
    width: '100%',
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
    width: 100,
    height: 100,
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
    opacity: 0.38,
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
    const [url, setUrl] = useState(currentSong?.file_song);
    const [urlImg, setUrlImg] = useState(currentSong?.url_img);
    const [volume, setVolume] = useState(0.8);
    const [playing, setPlaying] = useState(true);
    const [seeking, setSeeking] = useState(false);
    const [nameSong, setNameSong] = useState(currentSong?.nameSong);

    const [loaded, setLoaded] = useState(0);
    const [duration, setDuration] = useState(0);
    const [played, setPlayed] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const playerRef = useRef(null);

    console.log('---> playing', playing);
    console.log('---> seeking', seeking);
    console.log('---> played', played);
    console.log('---> duration', duration);
    const dataListSong = {};
    // useEffect(() => {
    //     axios.get("http://localhost:8080/songs").then((res) => {
    //         setListSong(res.data);
    //     })
    // }, []);

    useEffect(() => {
        setListSong(dataListSong)
    }, []);

    useEffect(() => {
        console.log("current: ", currentSong)
        console.log("img:", urlImg)
        setUrl(currentSong.file_song);
        setUrlImg(currentSong.url_img);
    }, [currentSong])
    const transferNextSong = () => {
        if (indexSong < listSong.length && indexSong >= 0) {
            setIndexSong(indexSong + 1)
            setUrl(listSong[indexSong].file_song);
            setUrlImg(listSong[indexSong].url_img);
        } else {
            setIndexSong(3)
        }
        console.log(indexSong);
    }
    const reverseNextSong = () => {
        if (indexSong < listSong.length && indexSong >= 0) {
            setIndexSong(indexSong - 1)
            setUrl(listSong[indexSong].file_song);
            setUrlImg(listSong[indexSong].url_img);
        } else {setIndexSong(3)}
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

    const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
    const lightIconColor =
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

    return (
        <>
            <Box sx={{width: '100%', overflow: 'hidden'}}>
                <Widget>
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
                                    <Typography variant="h6" color="text.secondary" fontWeight={500}>
                                        {currentSong?.nameSong === null ? "Điều ước giáng sinh" : currentSong?.nameSong}
                                    </Typography>
                                    <Typography>
                                        <b>{currentSong?.singer === null ? "Ca sĩ" : currentSong?.singer}</b>
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
                                }}
                            >
                                <IconButton aria-label="previous song" onClick={reverseNextSong}>
                                    <FastRewindRounded fontSize="large" htmlColor={mainIconColor}/>
                                </IconButton>
                                <IconButton
                                    aria-label={playing ? 'pause' : 'play'}
                                    onClick={handlePlayPause}
                                >
                                    {playing ? (
                                        <PauseRounded sx={{fontSize: '3rem'}} htmlColor={mainIconColor}/>
                                    ) : (
                                        <PlayArrowRounded
                                            sx={{fontSize: '3rem'}}
                                            htmlColor={mainIconColor}
                                        />
                                    )}
                                </IconButton>
                                <IconButton aria-label="next song" onClick={transferNextSong}>
                                    <FastForwardRounded fontSize="large" htmlColor={mainIconColor}/>
                                </IconButton>
                            </Box>
                            <input style={{
                                palette: {
                                primary: {
                                main: '#c8e6c9',
                            },
                                secondary: "red",
                            },
                            }}

                                className="form-control-range"
                                type='range' min={0} max={0.999999} step='any'
                                value={played}
                                onMouseDown={handleSeekMouseDown}
                                onChange={handleSeekChange}
                                onMouseUp={handleSeekMouseUp}
                            />
                            {/*<Slider*/}
                            {/*    aria-label="time-indicator"*/}
                            {/*    size="small"*/}
                            {/*    value={played ?? 0}*/}
                            {/*    min={0}*/}
                            {/*    step={1}*/}
                            {/*    max={duration}*/}
                            {/*    onChange={(_, value) => handleSeekChange(value)}*/}
                            {/*    sx={{*/}
                            {/*        color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',*/}
                            {/*        height: 4,*/}
                            {/*        '& .MuiSlider-thumb': {*/}
                            {/*            width: 8,*/}
                            {/*            height: 8,*/}
                            {/*            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',*/}
                            {/*            '&:before': {*/}
                            {/*                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',*/}
                            {/*            },*/}
                            {/*            '&:hover, &.Mui-focusVisible': {*/}
                            {/*                boxShadow: `0px 0px 0px 8px ${*/}
                            {/*                    theme.palette.mode === 'dark'*/}
                            {/*                        ? 'rgb(255 255 255 / 16%)'*/}
                            {/*                        : 'rgb(0 0 0 / 16%)'*/}
                            {/*                }`,*/}
                            {/*            },*/}
                            {/*            '&.Mui-active': {*/}
                            {/*                width: 20,*/}
                            {/*                height: 20,*/}
                            {/*            },*/}
                            {/*        },*/}
                            {/*        '& .MuiSlider-rail': {*/}
                            {/*            opacity: 0.28,*/}
                            {/*        },*/}
                            {/*    }}*/}
                            {/*/>*/}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    mt: 1,
                                }}
                            >
                                <TinyText>{formatDuration(duration * played)}</TinyText>
                                <TinyText>{formatDuration(duration)}</TinyText>
                            </Box>
                        </Grid>
                        <Grid xs={2} sm={4} md={3}>
                            <Stack spacing={2} direction="row" sx={{mb: 1, px: 1}} alignItems="center">
                                <VolumeDownRounded htmlColor={lightIconColor}/>
                                <Slider
                                    value={volume ?? 0.8}
                                    min={0}
                                    step={0.1}
                                    max={0.999999}
                                    onChange={handleVolumeChange}
                                    aria-label="Volume"
                                    sx={{
                                        color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                                        '& .MuiSlider-track': {
                                            border: 'none',
                                        },
                                        '& .MuiSlider-thumb': {
                                            width: 24,
                                            height: 24,
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
                                <VolumeUpRounded htmlColor={lightIconColor}/>
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

