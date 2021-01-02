import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import StaticComp from "@/components/StaticComp.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/static",
    name: "StaticComp",
    component: StaticComp
  }
];

const router = new VueRouter({
  routes
});

export default router;
