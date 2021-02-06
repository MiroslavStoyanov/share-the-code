import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Snippet from "../views/Snippet.vue";
import UserProfile from "../views/profile/UserProfile";

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
    component: Snippet,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/profile",
    name: "UserProfile",
    component: UserProfile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser !== null) {
      next();
      return;
    }
    next("/login");
  }
  next();
});

// router.beforeEach((to, _, next) => {
//   const publicPages = ["/login", "/register"];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem("loggedUser");

//   if (authRequired && !loggedIn) {
//     return next("/login");
//   }

//   next();
// });

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
