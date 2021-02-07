import Vue from "vue";
import VueRouter from "vue-router";
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
    const token = localStorage.getItem("jwt");
    if (token !== null) {
      next();
      return;
    }
    next("/login");
  }
  next();
});

export default router;
