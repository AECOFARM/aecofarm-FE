import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
  target: 'https://port-0-aecofarm-lyhj20nc49bb1c32.sel5.cloudtype.app',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // API 요청 경로에서 /api 부분을 제거합니다.
  },
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('Access-Control-Allow-Origin', '*');
  },
});

export const config = {
  api: {
    bodyParser: false, // bodyParser를 비활성화해야 프록시가 제대로 작동합니다.
  },
};
