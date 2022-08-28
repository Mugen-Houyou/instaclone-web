import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { darkModeVar, isLoggedInVar } from "../apollo";
import routes from '../routes';
import AuthLayout from "../components/auth/AuthLayout";
import { BaseBox } from "../components/shared/shared";
import SubmitButton from "../components/auth/SubmitButton";
import Seperator from "../components/auth/Seperator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import InstaLogo from "../components/auth/InstaLogo";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";

// const Title = styled.h1`
//     color:${(props) => props.theme.fontColor};
//     font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
// `;


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

    
    const { register, handleSubmit, formState:{isValid,errors} } = useForm({
        mode: "onChange",
    });//// 아래 <Input>와 같이 씀. ref={register}와 name=""를 붙여야 함.
    const onSubmitValid = (data) => {
        console.log("onSubmitValid: TRUE");
    };

    return <AuthLayout>
        <PageTitle title="Log In" />
        <FormBox>
            <InstaLogo />
            <h1>InstaClone</h1>
            <form onSubmit={handleSubmit(onSubmitValid)}>
                <Input 
                    {...register("username", {
                        required: "User ID is required",
                        minLength: {
                            value: 4,
                            message: "Type at least 4 characters for user ID",
                        }
                        //validate: (currentVal) => currentVal.includes("asdf") 
                        // 이 async는 즉 백엔드에서 검증하는 수단으로 쓸 수 있음. 
                        // validate는 submit할 때 실행됨.
                    })}
                    type="text" 
                    placeholder="User ID" 
                    hasError={Boolean(errors?.username?.message)}
                />                
                <FormError message={errors?.username?.message} />
                <Input 
                    {...register("password", {
                        required:"ERROR: PASSWORD IS REQUIRED",
                        minLength:8
                    })} 
                    type="password" 
                    placeholder="Password"  
                    hasError={Boolean(errors?.password?.message)}
                ></Input>
                <FormError message={errors?.password?.message} />
                <SubmitButton type="submit" value="Log In" disabled={!isValid}  ></SubmitButton>
            </form>

            <Seperator />

            <FacebookLogin>
                <FontAwesomeIcon icon={faFacebookF} ></FontAwesomeIcon>
                <span>Log in with Facemook</span>
            </FacebookLogin>
        </FormBox>
        
        <BottomBox call_to_action="계정이 없어?" linkText="가입하기" link={routes.signUp} />

    </AuthLayout>;
}
export default Login; 