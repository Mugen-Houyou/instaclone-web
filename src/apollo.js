import {ApolloClient, createHttpLink, InMemoryCache, makeVar} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { NavigateFunction } from "react-router-dom";

import routes from "./routes";

const TOKEN="token";
const DARK_MODE="darkmode";

export const MIN_ID_LEN = 4;
export const MIN_PW_LEN = 6;

export const isLoggedInVar = makeVar(localStorage.getItem(TOKEN));
export const darkModeVar = makeVar(localStorage.getItem(DARK_MODE));

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, {headers}) =>{
  return {headers: {
    ...headers,
    token: localStorage.getItem(TOKEN), // 백엔드의 server.js의 27번째 줄의 return { loggedInUser: await getUser(ctx.req.headers.token), }
  }}}
);

export const aClient = new ApolloClient({
  link: authLink.concat(httpLink), // httpLink에 authLink를 concat.
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: (obj) => `User:${obj.username}`,
      },
    },
  })
});

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "true");
  darkModeVar(true);
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN,token);
  isLoggedInVar(true);
} ;

export const logUserOut = (nvgt ) => {
  localStorage.removeItem(TOKEN);
  //isLoggedInVar(false);
  window.location.reload();
  nvgt(routes.home, { replace: true });
} ;
