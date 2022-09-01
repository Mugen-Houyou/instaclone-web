import {ApolloClient, InMemoryCache, makeVar} from "@apollo/client";

const TOKEN="token";
const DARK_MODE="darkmode";

export const MIN_ID_LEN = 4;
export const MIN_PW_LEN = 6;

export const isLoggedInVar = makeVar(localStorage.getItem(TOKEN));
export const darkModeVar = makeVar(localStorage.getItem(DARK_MODE));

export const aClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN,token);
  isLoggedInVar(true);
} 

export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
} 