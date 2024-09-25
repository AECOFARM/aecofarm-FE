import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SpoqaHanSansNeo';
    src: url('/fonts/SpoqaHanSansNeo-Bold.otf') format('opentype');
    font-weight: 700;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'SpoqaHanSansNeo';
    src: url('/fonts/SpoqaHanSansNeo-Light.otf') format('opentype');
    font-weight: 300;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'SpoqaHanSansNeo';
    src: url('/fonts/SpoqaHanSansNeo-Medium.otf') format('opentype');
    font-weight: 500;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'SpoqaHanSansNeo';
    src: url('/fonts/SpoqaHanSansNeo-Regular.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
  }
  
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
    font-family: 'SpoqaHanSansNeo', sans-serif;
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

  p {
    color: black;
  }
`;
