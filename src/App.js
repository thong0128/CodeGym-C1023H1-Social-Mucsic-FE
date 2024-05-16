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
                      <Route path={path.CREATE_SONG} element={<CreateSong/>}/>
                      <Route path={path.REGISTER} element={<Register/>}/>
                      <Route path={path.UPDATE_USER} element={<UpdateUser/>}/>
                      <Route path={path.UPDATE_PASS} element={<UpdatePass/>}/>
                      <Route path={path.UPDATE_SONG} element={<UpdateSong/>}/>
                      <Route path={path.SHOW_LIST_SONGS} element={<ShowListSong/>}/>
                      <Route path={path.DETAIL_SONG} element={<DetailSong/>}/>
                      <Route path={path.SHOW_PLAYLIST} element={<ShowPlaylist/>}/>
                      <Route path={path.VIEW_PLAYLIST} element={<ViewPlaylist/>}/>
                      <Route path={path.UPDATE_PLAYLIST} element={<UpdatePlayList/>}/>
                      <Route path={path.SUGGEST_PLAYLIST} element={<ShowSuggestPlaylist/>}/>
                  </Route>
              </Routes>
              </AppProvider> <ToastContainer />
          </div>
      </>
  );
}

export default App;
