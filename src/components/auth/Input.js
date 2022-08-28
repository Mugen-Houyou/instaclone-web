import styled from "styled-components";


//const SInput = styled.input`
const Input = styled.input`
    border-radius:3px;
    width: 100%;
    padding:7px;
    background-color:#FAFAFA;
    border: 0.4px solid ${(props) => props.hasError? "tomato": props.theme.borderColor};
    margin-top:5px;
    box-sizing: border-box;
    &::placeholder{
        font-size:12px;
    }
    &: focus{
        border-color: rgb(38,38,38);
    }
`;

// function Input(props) {
//     return <SInput {...props} />;
// }

export default Input;