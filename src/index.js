import React from "react";
import ReactDOM from "react-dom";
import SearchImages from "./pages/Greeting/SearchImages";
import reportWebVitals from "./reportWebVitals";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ReduxPromise from "redux-promise";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/index";
import InputName from "./pages/InputName/InputName";

import "./index.css";

const AppWrapper = () => {
  const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

  return (
    <BrowserRouter>
      <Provider store={createStoreWithMiddleware(rootReducer)}>
        <Switch>
          <Route exact path="/" component={InputName} />
          <Route exact path="/images" component={SearchImages} />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
