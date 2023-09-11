import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";

const DashBoard = () => import("@/views/DashBoard.vue");
const SignUp = () => import("@/views/SignUp.vue");

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashBoard,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  // {
  // path: "/signup",
  // name: "signup",
  // component: () =>
  // import(/* webpackChunkName: "feed" */ "./views/SignUp.vue"),
  // beforeEnter: (to, from, next) => {
  // if (sessionStorage.getItem("token") !== null) {
  // next();
  // } else {
  // next("/");
  // }
  // },
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
