import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import StaticComp from "@/components/StaticComp.vue";
import DynamicComp from "@/components/DynamicComp.vue";

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
  },
  {
    path: "/dynamic",
    name: "DynamicComp",
    component: DynamicComp
  }
];

const router = new VueRouter({
  routes
});

export default router;
