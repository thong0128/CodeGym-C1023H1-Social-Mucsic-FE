
import './App.css';
import {Route, Routes} from "react-router-dom";
import Register from "./register/Register";
import {ToastContainer} from "react-toastify";
import {AppProvider} from "./Context/AppContext";
import Login from "./login/Login";



function App() {
  return (
      <>
          <div>
              <AppProvider>
              <Routes>
                      <Route path={"login"} element={<Login/>}></Route>
                      <Route path={"register"} element={<Register/>}></Route>
              </Routes>
              </AppProvider> <ToastContainer />

          </div>
      </>
  );
}

export default App;
