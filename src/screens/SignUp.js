import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";

import { darkModeVar, isLoggedInVar } from "../apollo";
import routes from '../routes';
import AuthLayout from "../components/auth/AuthLayout";
import { BaseBox, FatLink } from "../components/shared/shared";
import SubmitButton from "../components/auth/SubmitButton";
import Seperator from "../components/auth/Seperator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import InstaLogo from "../components/auth/InstaLogo";
import { Helmet, HelmetProvider } from "react-helmet-async";
import PageTitle from "../components/PageTitle";

// const Title = styled.h1`
//     color:${(props) => props.theme.fontColor};
//     font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
// `;

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Subtitle=styled(FatLink)`
    font-size: 16px;
    text-align: center;
`;

function SignUp({ setIsLoggedIn }) {
    // const [potato, setPotato]  =useState(false);
    // const togglePotato = () => setPotato((current) => !current);
    return <AuthLayout>
        <PageTitle title="Sign Up"></PageTitle>
        <FormBox>
            <HeaderContainer>
                <InstaLogo />
                <Subtitle>Sign up to see photos and videos from your friends!</Subtitle>
            </HeaderContainer>
            <Seperator />
            <form>
                <Input type="text" placeholder="Mobile Number or Email"  ></Input>
                <Input type="text" placeholder="Full Name"  ></Input>
                <Input type="text" placeholder="Username"  ></Input>
                <Input type="password" placeholder="Password"  ></Input>
                <SubmitButton type="submit" value="Log In"  ></SubmitButton>
            </form>


        </FormBox>
        
        <BottomBox call_to_action="계정이 있어?" linkText="로그인" link={routes.home} />

    </AuthLayout>;
}
export default SignUp; 