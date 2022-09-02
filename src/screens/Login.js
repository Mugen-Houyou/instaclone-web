import styled from "styled-components";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { gql, useMutation } from "@apollo/client";

import { darkModeVar, isLoggedInVar, logUserIn } from "../apollo";
import routes from "../routes";
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
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Notification = styled.div`
  color: #2ecc71;
`;

const LOGIN_MUTATION = gql`
  mutation login_mut($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
  }}
`;

function Login({ setIsLoggedIn }) {
  // form, 함수들, hook 순서.

  // const [potato, setPotato]  =useState(false);
  // const togglePotato = () => setPotato((current) => !current);

  const location = useLocation();
  console.log(location)

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    getValues,
    setError,
    clearErrors
  } = useForm({
    mode: "onChange",
    defaultValues:{
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    }
  }); //// 아래 <Input>와 같이 씀. ref={register}와 name=""를 붙여야 함.

  const onSubmitValid = (data) => {
    //console.log("onSubmitValid: TRUE");
    if (loading) return;
    const { username, password } = getValues();
    loginMutationFunction({ variables: { username, password } });
  };
  const onCompleted = (loginData) => {
    const {login: { ok, error, token },} = loginData;
    if (!ok) setError("result", { message: error }); // 즉, error.result.message을 백엔드의 GraphQL에서 받아오는 값으로.
    if (token) logUserIn(token);
  };

  const [loginMutationFunction, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  }); //hook

  return <AuthLayout>
    <PageTitle title="Log In" />
    <FormBox>
      <InstaLogo />
      <h1>InstaClone</h1>
      <Notification>
        {location?.state?.message /* location이 있다면 state이 있다면 message를 표시. */}
      </Notification>
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <Input
          {...register("username", {
            required: "User ID is required",
            minLength: {
              value: 4,
              message: "Type at least 4 characters for user ID",
            },
            //validate: (currentVal) => currentVal.includes("asdf")
            // 이 async는 즉 백엔드에서 검증하는 수단으로 쓸 수 있음.
            // validate는 submit할 때 실행됨.
            validate: () => {
              if (errors.result) clearErrors("result");
            },
          })}
          type="text"
          placeholder="User ID"
          hasError={Boolean(errors?.username?.message)}
        />
        <FormError message={errors?.username?.message} />
        <Input
          {...register("password", {
            required: "ERROR: PASSWORD IS REQUIRED",
            minLength: 6,
            validate: () => {
              if (errors.result) clearErrors("result");
            },
          })}
          type="password"
          placeholder="Password"
          hasError={Boolean(errors?.password?.message)}
        ></Input>
        <FormError message={errors?.password?.message} />
        <SubmitButton
          type="submit"
          value={loading ? "Loading..." : "Log In"}
          disabled={!isValid || loading}
        ></SubmitButton>

        <FormError message={errors?.result?.message} />
      </form>

      <Seperator />

      <FacebookLogin>
        <FontAwesomeIcon icon={faFacebookF}></FontAwesomeIcon>
        <span>Log in with Facemook</span>
      </FacebookLogin>
    </FormBox>

    <BottomBox
      call_to_action="계정이 없어?"
      linkText="가입하기"
      link={routes.signUp}
    />
  </AuthLayout>;
}
export default Login;
