import logo from './logo.svg';
import './App.css';
import '../scss/main.scss';

import {BrowserRouter, Route} from "react-router-dom";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import MyPage from "../pages/MyPage";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Route path="/" exact component={LogIn}/>
        <Route path="/signup" exact component={SignUp}/>
        <Route path="/mypage" exact component={MyPage}/>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
