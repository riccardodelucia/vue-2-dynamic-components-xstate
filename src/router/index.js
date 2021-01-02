import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NumberedStates from "@/components/NumberedStates.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/numbered-states",
    name: "NumberedStates",
    component: NumberedStates
  }
];

const router = new VueRouter({
  routes
});

export default router;
