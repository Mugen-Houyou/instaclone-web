import styled from "styled-components";

const SFormError = styled.span`
    color:tomato;
    font-weight:900;
    font-size:12px;
    margin: 5px 0px 10px 0px;
`;

function FormError({message}){
    return (message==="" || !message) ? null : <SFormError>{message}</SFormError>
}

export default FormError;