import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";

import { darkModeVar, isLoggedInVar } from "../apollo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Title = styled.h1`
    color:${(props) => props.theme.fontColor};
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
`;
const Container = styled.div`
    display:flex;
    height:100vh;
    justify-content:center;
    align-items:center;
    flex-direction:column;

`;

const WhiteBox = styled.div`
    background-color:white;
    border: 1px solid ${(props) => props.theme.borderColor};
    width:100%;

`;

const Seperator = styled.div`

    margin:20px 0px 30px 0px;
    text-transform: uppercase;
    display:flex;
    justify-content:center;
    align-items:center;  
    width:100%;     
    div{
        width:100%;
        height:1px;
        background-color: ${(props) => props.theme.borderColor};
        
    }
    span{
        margin: 0px 10px;
        font-weight:600;
        font-size:12px;
        color: #8e8e8e;
    }
`;

const TopBox = styled(WhiteBox)`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    padding:35px 40px 24px 40px;
    margin-bottom: 20px;
    form{
        margin-top: 35px;
        width:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
    }
`;

const Input=styled.input`
    border-radius:3px;
    width: 100%;
    padding:7px;
    background-color:#FAFAFA;
    border: 0.4px solid ${(props) => props.theme.borderColor};
    margin-top:5px;
    box-sizing: border-box;
    &::placeholder{
        font-size:12px;
    }
`;

const Button=styled.input`
    border:none;
    margin-top:12px;
    background-color: ${(props) => props.theme.accent};
    color: white;
    text-align: center;
    padding: 8px 0px;
    font-weight: 500;
    width:100%
`;

const BottomBox = styled(WhiteBox)`
    text-align:center;
    padding: 20px 0px;
    a{
        margin-left:5px;    
        font-weight: 600;
        color:  ${(props) => props.theme.accent};
    }
`;

const Wrapper = styled.div`
    max-width:350px;
    width:100%;     
`;

const FacebookLogin = styled.div`
    color: #385285;
    span{
        margin-left: 10px;
        font-weight: 600;
    }
`;

function Login({ setIsLoggedIn }) {
    // const [potato, setPotato]  =useState(false);
    // const togglePotato = () => setPotato((current) => !current);
    return (<Container ><Wrapper>
        <TopBox>
            <div>
                <FontAwesomeIcon icon={faInstagram} size="4x" ></FontAwesomeIcon>
            </div>
            <h1>InstaClone</h1>
            <form>
                <Input type="text" placeholder="Username"  ></Input>
                <Input type="password" placeholder="Password"  ></Input>
                <Button type="submit" value="Log In"  ></Button>
            </form>
            <Seperator>
                <div />
                <span>OR</span>
                <div />
            </Seperator>
            <FacebookLogin>
                <FontAwesomeIcon icon={faFacebookF} ></FontAwesomeIcon>
                <span>Log in with Facemook</span>
            </FacebookLogin>
        </TopBox>
        <BottomBox>
            <span>Don't have an account? </span>
            <Link to="/sign-up">Sign Up!</Link>
        </BottomBox>
    </Wrapper></Container>);
}
export default Login;