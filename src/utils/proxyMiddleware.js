const {
  createProxyMiddleware,
  fixRequestBody,
} = require("http-proxy-middleware");
const auth = require("../middlewares/auth");

function gotoURL(url) {
  return createProxyMiddleware({
    target: url,
    onProxyReq: fixRequestBody,
    changeOrigin: true,
  });
}

module.exports = { gotoURL };
