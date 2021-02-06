import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Snippet from "../views/Snippet.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Signup",
    component: Signup
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/snippet/create",
    name: "Snippet",
    component: Snippet
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// eslint-disable-next-line no-unused-vars
router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  NProgress.done();
});

export default router;
