import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import Tictactoe from "./Components/Tictactoe.js";

const client = new ApolloClient({
  uri: "https://ianetruiste-tictactoe-server.herokuapp.com/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route path="/" render={() => <Tictactoe />} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
