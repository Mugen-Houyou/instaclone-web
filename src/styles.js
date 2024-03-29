import { createGlobalStyle } from "styled-components"
import reset from "styled-reset";

export const lightTheme = {
  fontColor: "rgb(38,38,38)",
  bgColor: "#FAFAFA",
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
      color: ${(props) => props.theme.fontColor};
      font-family: 'Open Sans', sans-serif;
      font-size: 14px;
  }
  a{
    text-decoration:none;
    color:inherit;
  }
`;