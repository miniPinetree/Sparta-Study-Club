import React from "react";
import './App.css';
import '../scss/main.scss';
import { ConnectedRouter } from "connected-react-router";
import { BrowserRouter, Route } from "react-router-dom";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import MyPage from "../pages/MyPage";
import GroupList from "../pages/GroupList";
import GroupDetail from "../pages/GroupDetail";


//리덕스 스토어의 history를 사용하기 위함.
import {history} from "../redux/configStore";

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { useDispatch, useSelector } from "react-redux";
import {actionCreators as userActions} from "../redux/modules/user"; 

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

// React.useEffect(()=>{
 
//  if(!user&&window.location.pathname !== "/signup"){
//   dispatch(userActions.loginCheckDB());
//   }
  
// }, []);
  return (
    <React.Fragment>
    <ConnectedRouter history={history}>
        <Route path="/" exact component={LogIn}/>
        <Route path="/signup" exact component={SignUp}/>
        <Route path="/mypage" exact component={MyPage}/>
        <Route path="/group" exact component={GroupList}/>
        <Route path="/group/detail" exact component={GroupDetail}/>
      </ConnectedRouter>
    </React.Fragment>
  );
}
export default App;
