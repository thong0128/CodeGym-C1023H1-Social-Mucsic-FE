
import './App.css';
import {Route, Routes} from "react-router-dom";
import Register from "./register/Register";
import {ToastContainer} from "react-toastify";
import {AppProvider} from "./Context/AppContext";
import Login from "./login/Login";
import Home from "./home/Home";
import {CreateSong} from "./component/createSong/CreateSong";



function App() {
  return (
      <>
          <div>
              <AppProvider>
              <Routes>
                  <Route path={"songs/create"} element={<CreateSong/>}></Route>
                  <Route path={"login"} element={<Login/>}></Route>
                  <Route path={"register"} element={<Register/>}></Route>
                  <Route path={"home"} element={<Home/>}></Route>
              </Routes>
              </AppProvider> <ToastContainer />

          </div>
      </>
  );
}

export default App;
