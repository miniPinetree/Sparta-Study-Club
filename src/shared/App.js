import React from "react";
import './App.css';
import '../scss/main.scss';
import { ConnectedRouter } from "connected-react-router";
import { BrowserRouter, Route } from "react-router-dom";
import { history } from "../redux/configStore";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import MyPage from "../pages/MyPage";

//리덕스 스토어의 history를 사용하기 위함.
import { ConnectedRouter } from "connected-react-router";
import {history} from "../redux/configStore";

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { setCookie, getCookie, deleteCookie } from "./Cookie";
import {actionCreators as userActions} from "../redux/modules/user"; 

function App() {

  const initializeUserInfo = () => {
    const token = getCookie('token');
    if(!token) return;

    const { UserActions } = this.props;
    UserActions.loginCheckDB();
};
React.useEffect(()=>{
 // initializeUserInfo();
 console.log("get user");
}, []);


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
