import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom"; 

import { darkModeVar, isLoggedInVar, MIN_ID_LEN, MIN_PW_LEN } from "../apollo";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import { FatLink } from "../components/shared/shared";
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

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstname: String!
    $lastname: String
    $username: String!
    $email: String!
    $password: String!
  ){
    createAccount(
      firstName:$firstname
      lastName:$lastname
      username:$username
      email:$email
      password:$password
    ){
      ok
      error
    }
  }
`;

function SignUp({ setIsLoggedIn }) {
  const navigate = useNavigate();
  
  const { 
    register , 
    handleSubmit,  
    formState: { isValid, errors }, 
    setError,
    clearErrors
  } = useForm({mode:"onChange"});

  const onSubmitValid = (loginData ) => {
    if (loading) return;
    createAccountMutationFunction({
      variables:{
        ...loginData
    }})
  }
  const onCompleted = (loginData) => {
    const {createAccount: {ok, error}} = loginData;
    if (!ok) setError("result", { message: error }); // 즉, error.result.message을 백엔드의 GraphQL에서 받아오는 값으로.
    navigate(routes.home);
  };

  const [createAccountMutationFunction, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION,{
      onCompleted,
  }); //hook


  return (
    <AuthLayout>
      <PageTitle title="Sign Up"></PageTitle>
      <FormBox>
        <HeaderContainer>
          <InstaLogo />
          <Subtitle>
            Sign up to see photos and videos from your friends!
          </Subtitle>
        </HeaderContainer>
        <Seperator />
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("firstname", {
              required: "First name is required",
              minLength: {
                value: 1,
                message: "Type at least 1 characters for first name",
              },
            })}
            type="text"
            placeholder="First Name"
          ></Input>
          <Input
            {...register("lastname", {
              required: "First name is required",
              minLength: {
                value: 1,
                message: "Type at least 1 characters for last name",
              },
            })}
            type="text"
            placeholder="Last Name"
          ></Input>
          <Input
            {...register("email", {
              required: "First name is required",
              minLength: {
                value: 3,
                message: "Type at least 3 characters for email",
              },
            })}
            type="text"
            placeholder="Email"
          ></Input>
          <Input
            {...register("username", {
              required: "User ID is required",
              minLength: {
                value: MIN_ID_LEN,
                message: "Type at least" + MIN_ID_LEN + " characters for password",
              },
            })}
            type="text"
            placeholder="User ID"
          ></Input>
          <Input
            {...register("password", {
              required: "First name is required",
              minLength: {
                value: MIN_PW_LEN,
                message: "Type at least" + MIN_PW_LEN + " characters for password",
              },
            })}
            type="password"
            placeholder="Password"
          ></Input>
          <SubmitButton
              type="submit"
              value={loading ? "Loading..." : "Sign Up"}
              disabled={!isValid || loading}
          ></SubmitButton>
        </form>
      </FormBox>
      

      <FormError message={errors?.result?.message} />

      <BottomBox
        call_to_action="계정이 있어?"
        linkText="로그인"
        link={routes.home}
      />
    </AuthLayout>
  );
}
export default SignUp;
