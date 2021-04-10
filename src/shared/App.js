import React from "react";
import './App.css';
import '../scss/main.scss';
import { ConnectedRouter } from "connected-react-router";
import { BrowserRouter, Route } from "react-router-dom";
import { history } from "../redux/configStore";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import MyPage from "../pages/MyPage";

function App() {
  return (
    <React.Fragment>
    <ConnectedRouter history={history}>
        <Route path="/" exact component={LogIn}/>
        <Route path="/signup" exact component={SignUp}/>
        <Route path="/mypage" exact component={MyPage}/>
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
