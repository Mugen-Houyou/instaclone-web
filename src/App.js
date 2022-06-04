import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Login from './screens/Login';
import Home from './screens/Home';
import NotFound from './screens/NotFound';
import { useReactiveVar } from '@apollo/client';
import { darkModeVar, isLoggedInVar } from './apollo';
import { ThemeProvider } from 'styled-components';
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import SignUp from './screens/SignUp';

function App() {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  
  return <ThemeProvider theme={darkMode?darkTheme:lightTheme}><GlobalStyles /><div>
    <Router>
      <Routes> {/* Switch는 한번에 딱 하나의 Route만 render시켜줘.*/}
        <Route path="/" exact element={ /* exact는 정확히 /에 해당하는 것만. */
          isLoggedIn ?
            <Home  />
            :
            <Login  />
        } /> 
        <Route path="/potato" element={ /* 이곳에 뭘 넣든지, 이곳에 표시한 path로 갔을 때 여기 안에 있는 것을 보여줄 거야.*/
          <h1>I'm a potato.</h1>
        } /> 
        <Route path="/nomad-coders" element={<>
          <h1>Nomad Coders</h1>
          {isLoggedIn ? <h2>Hi!</h2> : <h2>Please, login.</h2>}
        </>} />  

        {!isLoggedIn ? (
          <Route path="/sign-up" element={<>
            <SignUp />
          </>} />  
        ) : null}

        <Route path="*" element={<NotFound />} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Router>

    </div></ThemeProvider>;
}

export default App;
