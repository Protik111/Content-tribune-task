import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import Course from "./pages/Course";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/course" element={<Course></Course>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
