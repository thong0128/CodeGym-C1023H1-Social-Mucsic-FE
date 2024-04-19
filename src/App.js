
import './App.css';
import {Route, Routes} from "react-router-dom";
import Register from "./register/Register";
import {ToastContainer} from "react-toastify";
import {AppProvider} from "./Context/AppContext";
import Login from "./login/Login";
import Home from "./home/Home";
import ChangePassword from "./changepassword/ChangePassword";



function App() {
  return (
      <>
          <div>
              <AppProvider>
              <Routes>
                      <Route path={"login"} element={<Login/>}></Route>
                      <Route path={"register"} element={<Register/>}></Route>
                      <Route path={"home"} element={<Home/>}></Route>
                      <Route path={""} element={<Home/>}></Route>
                      <Route path={"users/update/pass/:id"} element={<ChangePassword/>}></Route>
              </Routes>
              </AppProvider> <ToastContainer />

          </div>
      </>
  );
}

export default App;
