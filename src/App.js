import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./components/Login";
import Spinner from "react-spinkit";

function App() {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return (
      <Apploading>
        <ApploadingContents>
          <img
            src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
            alt=""
          />
          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </ApploadingContents>
      </Apploading>
    );
  }
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

            <Header />
            <AppBody className="AppBody">
              <Sidebar />
              <Switch>
                <Route path="/" exact>
                  <Chat />
                </Route>
              </Switch>
            </AppBody>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const Apploading = styled.div`
  display: grid;
  place-items: calc();
  height: 100vh;
  width: 100%;
`;

const ApploadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;
