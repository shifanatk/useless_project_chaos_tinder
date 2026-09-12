import React, { useEffect } from "react";
import Header from "./Header";
import TinderCard from "./TinderCards";
import Chats from "./Chats";
import ChatScreen from "./ChatScreen";
import PremiumBanner from "./PremiumBanner";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import {
  initGlobalChaos,
  cleanupGlobalChaos,
  initElusiveLikeButton,
  cleanupElusiveLike,
} from "./chaos";
import "./App.css";

function ChaosController() {
  const location = useLocation();

  useEffect(() => {
    initGlobalChaos();
    return cleanupGlobalChaos;
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      const timer = setTimeout(() => initElusiveLikeButton(), 300);
      return () => {
        clearTimeout(timer);
        cleanupElusiveLike();
      };
    }

    cleanupElusiveLike();
    return undefined;
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <div className="App">
      <Router>
        <ChaosController />
        <PremiumBanner />
        <Switch>
          <Route path="/chat/:person">
            <Header backButton="/chat" />
            <ChatScreen />
          </Route>
          <Route path="/chat">
            <Header backButton="/" />
            <Chats />
          </Route>
          <Route path="/">
            <Header />
            <TinderCard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
