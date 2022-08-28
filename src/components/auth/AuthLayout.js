import styled from "styled-components";

const Container = styled.div`
    display:flex;
    height:100vh;
    justify-content:center;
    align-items:center;
    flex-direction:column;

`;

const Wrapper = styled.div`
    max-width:350px;
    width:100%;     
`;


function AuthLayout({children}){ 
    // props는 부모(App.js)가 자식(Second.js)에게 전달해주는 값, 파라미터.
    // 한편, children이란, React component의 안에 집어넣은 모든 것을 뜻해. 정확히는 props.children임.
    return <Container><Wrapper>{children}</Wrapper></Container>;
}

export default AuthLayout;