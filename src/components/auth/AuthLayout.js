import { useReactiveVar } from "@apollo/client";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { darkModeVar, disableDarkMode, enableDarkMode } from "../../apollo";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Footer = styled.footer`
  margin-top:20px;
`;
const DarkModeButton = styled.span`
  cursor: pointer;
`;

function AuthLayout({ children }) {
  // props는 부모(App.js)가 자식(Second.js)에게 전달해주는 값, 파라미터.
  // 한편, children이란, React component의 안에 집어넣은 모든 것을 뜻해. 정확히는 props.children임.
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <Container>
      <Wrapper>{children}</Wrapper>
      <Footer>
        <DarkModeButton onClick={darkMode? disableDarkMode :enableDarkMode } >
          <FontAwesomeIcon icon={darkMode? faSun:faMoon } />
        </DarkModeButton>
      </Footer>
    </Container>
  );
}

export default AuthLayout;
