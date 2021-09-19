const express = require("express");
const authRoute = require("./auth.route");
const postRoute = require("./post.route");
const commentRoute = require("./comment.route");
const topicRoute = require("./topic.route");
const config = require("../../configs/config");

const router = express.Router();
const { checkAuthAndGotoUrl, gotoURL } = require("../../utils/proxyMiddleware");
const auth = require("../../middlewares/auth");

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/post",
    route: postRoute,
  },
  {
    path: "/topic",
    route: topicRoute,
  },
  {
    path: "/comment",
    route: commentRoute,
  },
];

const devRoutes = [];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
