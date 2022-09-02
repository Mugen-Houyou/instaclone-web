import {ApolloClient, InMemoryCache, makeVar} from "@apollo/client";

import { NavigateFunction } from "react-router-dom";

import routes from "./routes";

const TOKEN="token";
const DARK_MODE="darkmode";

export const MIN_ID_LEN = 4;
export const MIN_PW_LEN = 6;

export const isLoggedInVar = makeVar(localStorage.getItem(TOKEN));
export const darkModeVar = makeVar(localStorage.getItem(DARK_MODE));

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "true");
  darkModeVar(true);
}

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
}

export const aClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN,token);
  isLoggedInVar(true);
} 

export const logUserOut = (nvgt ) => {
  localStorage.removeItem(TOKEN);
  //isLoggedInVar(false);
  window.location.reload();
  nvgt(routes.home, { replace: true });
} 