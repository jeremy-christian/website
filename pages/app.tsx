import React from "react";
import { Route, BrowserRouter, useHistory } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import Home from "./home";
import Login from "./login";
import Protected from "./protected";

const AppWithRouterAccess = () => {
  return (
    <Security
      issuer="https://jeremychristian.co.uk/oauth2/default"
      clientId="0oa5112tk1nS3WYRv4x6"
      redirectUri={window.location.origin + "/implicit/callback"}
      pkce={true}
    >
      <Route path="/" exact={true} component={Home} />
      <SecureRoute path="/protected" component={Protected} />
      <Route
        path="/login"
        render={() => <Login baseUrl="https://jeremychristian.co.uk" />}
      />
      <Route path="/implicit/callback" component={LoginCallback} />
    </Security>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppWithRouterAccess />
    </BrowserRouter>
  );
};

export default App;
