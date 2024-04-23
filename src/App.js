import { useDispatch } from 'react-redux';
import './App.css';
import {ToastContainer} from "react-toastify";
import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import Public from "./page/public/Public";
import path from "./untis/path";
import Home from "./page/public/Home";
import Login from "./page/public/Login";
import * as actions from './store/actions'
import UserList from "./page/public/UserList";
import UpdateUser from "./page/public/UpdateUser";
import Album from "./page/public/Album";
import UpdatePass from "./page/public/UpdatePassword";
import Register from "./page/public/Register";
import CreateSong from "./components/CreateSong";
import UpdateSong from "./components/UpdateSong";
import ShowListSong from "./components/ShowListSong";
import {DetailSong} from "./components";
import ListSearchBySongName from "./page/public/ListSearchBySongName";
import ShowPlaylist from "./components/ShowPlaylist";
import ViewPlaylist from "./components/ViewPlaylist";
import {AppProvider} from "./Context/AppContext";
import UpdatePlayList from "./components/UpdatePlayList";
import ViewSongByType from "./components/ViewSongByType";
import ShoListSongByNameSinger from "./components/ShoListSongByNameSinger";
import CreatePlayList from "./components/CreatePlayList";



function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actions.getHome())
    }, [])
  return (
      <>
          <div>
              <AppProvider>
              <Routes>
                  <Route path={path.PUBLIC} element={<Public/>}>
                      <Route path={path.HOME} element={<Home/>}></Route>
                      <Route path={path.LOGIN} element={<Login/>}></Route>
                      <Route path={path.CREATESONG} element={<CreateSong></CreateSong>}></Route>
                      <Route path={path.REGISTER} element={<Register/>}></Route>
                      <Route path={path.LISTUSER} element={<UserList/>}></Route>
                      <Route path={path.UPDATEUSER} element={<UpdateUser/>}></Route>
                      <Route path={'album/:id'} element={<Album/>}></Route>
                      <Route path={path.UPDATEPASS} element={<UpdatePass/>}></Route>
                      <Route path={"update/:id"} element={<UpdateSong></UpdateSong>}></Route>
                      <Route path={"showList"} element={<ShowListSong></ShowListSong>}></Route>
                      <Route path={path.DETAILSONG} element={<DetailSong/>}></Route>
                      <Route path={path.SEARCHBYSONGNAME} element={<ListSearchBySongName/>}></Route>
                      <Route path={"showPlaylist"} element={<ShowPlaylist/>}></Route>
                      <Route path={"viewPlaylist/:id"} element={<ViewPlaylist/>}></Route>
                      <Route path={"updatePlayList/:id"} element={<UpdatePlayList/>}></Route>
                      <Route path={"viewSongByType/:id"} element={<ViewSongByType/>}></Route>
                      <Route path={"showListByNameSinger/:name"} element={<ShoListSongByNameSinger/>}></Route>
                  </Route>
              </Routes>
              </AppProvider> <ToastContainer />
          </div>
      </>
  );
}

export default App;
