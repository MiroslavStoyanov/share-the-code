import Vue from "vue";
import VueRouter from "vue-router";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Snippet from "../views/snippets/Snippet.vue";
import BrowseSnippets from "../views/snippets/BrowseSnippets";
import UserProfile from "../views/profile/UserProfile";
import SnippetDetails from "../components/snippets/SnippetDetails";

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
    path: "/snippet/browse",
    name: "BrowseSnippets",
    component: BrowseSnippets
  },
  {
    path: "/snippet/details",
    name: "SnippetDetails",
    component: SnippetDetails,
    props: route => ({
      ...route.params
    })
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
