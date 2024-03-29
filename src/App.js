import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { ThemeProvider } from 'styled-components';

import logo from './logo.svg';
import './App.css';
import Login from './screens/Login';
import Home from './screens/Home';
import NotFound from './screens/NotFound';
import { aClient, darkModeVar, isLoggedInVar } from './apollo';
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import SignUp from './screens/SignUp';
import routes from "./routes";
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Profile from "./screens/Profile";

function App() {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  
  return <ApolloProvider client={aClient}><HelmetProvider>
    <ThemeProvider theme={darkMode?darkTheme:lightTheme}>
      <GlobalStyles /> 
      <div>
        <Router>
          <Routes> {/* Switch는 한번에 딱 하나의 Route만 render시켜줘.*/}
            <Route path={routes.home} exact element={ /* exact는 정확히 /에 해당하는 것만. */
              isLoggedIn ?
                <Layout><Home/></Layout>
              :
                <Login  />
              } 
            /> 

            {!isLoggedIn ? (
              <Route path={routes.signUp} element={<>
                <SignUp />
              </>} />  
            ) : null}

            <Route path="/potato" element={ /* 이곳에 뭘 넣든지, 이곳에 표시한 path로 갔을 때 여기 안에 있는 것을 보여줄 거야.*/
              <h1>I'm a potato.</h1>
            } /> 
            <Route path="/nomad-coders" element={<>
              <h1>Nomad Coders</h1>
              {isLoggedIn ? <h2>Hi!</h2> : <h2>Please, login.</h2>}
            </>} />  
            <Route path={`/users/:username`} element={
              <Layout><Profile/></Layout>
            }/>
            <Route path="*" element={<NotFound />} />
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  </HelmetProvider></ApolloProvider>;
}

export default App;
