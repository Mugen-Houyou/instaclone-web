import { createGlobalStyle } from "styled-components"
import reset from "styled-reset";

export const lightTheme = {
  fontColor: "#2C2C2C",
  bgColor: "lightgray",
  accent: "#0095f6",
  borderColor: "rgb(219,219,219)",
}
export const darkTheme = {
  fontColor: "lightgray",
  bgColor: "#2C2C2C"
}

export const GlobalStyles = createGlobalStyle`
  ${reset}
  input { 
    all:unset;
  } 
  *{
    box-sizing: border-box;
  }
  body {
      background-color: ${(props) => props.theme.bgColor};
      color: rgb(38,38,38);
      font-family: 'Open Sans', sans-serif;
      font-size: 14px;
  }
  a{
    text-decoration:none;
  }
`;