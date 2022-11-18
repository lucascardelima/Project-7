import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import SignupPage from "../views/SignupPage.vue";
import HomePage from "../views/HomePage.vue"
import CreatePost from "../views/CreatePost.vue"
import EditPost from "../views/EditPost.vue"


const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/loginpage",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/signuppage",
    name: "signup",
    component: SignupPage,
  },
  {
    path: "/createpost",
    name: "create post",
    component: CreatePost,
  },
  {
    path: "/editpost/:postid",
    name: "editpost",
    component: EditPost,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
