import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import Course from "./pages/Course";
import ProtectRoute from "./components/ProtectRoute";
import { useEffect } from "react";
import { loadUser } from "./redux/action/Auth.action";
import setAuthToken from "./utils/setAuthToken";

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/course" element={<ProtectRoute> <Course /> </ProtectRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
