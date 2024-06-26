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
import UpdateUser from "./page/public/UpdateUser";
import Album from "./page/public/Album";
import UpdatePass from "./page/public/UpdatePassword";
import Register from "./page/public/Register";
import CreateSong from "./components/CreateSong";
import UpdateSong from "./components/UpdateSong";
import {DetailSong} from "./components";
import ShowPlaylist from "./components/ShowPlaylist";
import ViewPlaylist from "./components/ViewPlaylist";
import {AppProvider} from "./Context/AppContext";
import UpdatePlayList from "./components/UpdatePlayList";
import SearchResult from "./components/SearchResult";
import ShowSuggestPlaylist from "./components/ShowSuggestPlaylist";
import ShowListSong from "./components/ShowListSong";

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
                      <Route path={path.HOME} element={<Home/>}/>
                      <Route path={path.FILL} element={<SearchResult/>}/>
                      <Route path={path.LOGIN} element={<Login/>}/>
                      <Route path={path.CREATESONG} element={<CreateSong/>}/>
                      <Route path={path.REGISTER} element={<Register/>}/>
                      <Route path={path.UPDATEUSER} element={<UpdateUser/>}/>
                      <Route path={'album/:id'} element={<Album/>}/>
                      <Route path={path.UPDATEPASS} element={<UpdatePass/>}/>
                      <Route path={"update/:id"} element={<UpdateSong/>}/>
                      <Route path={"showList"} element={<ShowListSong/>}/>
                      <Route path={path.DETAILSONG} element={<DetailSong/>}/>
                      <Route path={"showPlaylist"} element={<ShowPlaylist/>}/>
                      <Route path={"viewPlaylist/:id"} element={<ViewPlaylist/>}/>
                      <Route path={"updatePlayList/:id"} element={<UpdatePlayList/>}/>
                      <Route path={path.SUGGEST_PLAYLIST} element={<ShowSuggestPlaylist/>}/>
                  </Route>
              </Routes>
              </AppProvider> <ToastContainer />
          </div>
      </>
  );
}

export default App;
