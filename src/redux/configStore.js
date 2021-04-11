import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user";

export const history = createBrowserHistory();

//리듀서는 하나만 이용가능하므로 rootReducer로 합함.
const rootReducer = combineReducers({
    user:User,
    router: connectRouter(history),
})

//미들웨어 추가 및 enhancer로 합치기
const middlewares = [thunk.withExtraArgument({history:history})];
//개발환경에서 로거를 사용할 수 있게 함.
const env = process.env.NODE_ENV;
if (env==="development"){
    const {logger}=require("redux-logger");
    middlewares.push(logger);
}
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
);

//루트리듀서와 미들웨어를 엮어 스토어생성
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();