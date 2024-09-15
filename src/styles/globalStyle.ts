import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  
  html,
  body {
    background-color: #ffffff;
    max-width: 100vw;
    overflow-x: hidden;
    font-size: 16px;
  }
  
  body {
    color: #000000;
    background-color: #ffffff;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
`;