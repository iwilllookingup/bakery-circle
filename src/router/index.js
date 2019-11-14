import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/order",
    name: "order",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue")
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../views/Contact.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/transaction",
    name: "transaction",
    component: () => import("../views/Transaction.vue")
  },
  {
    path: "/menu",
    name: "menu",
    component: () => import("../views/Menu.vue")
  },
  {
    path: "/transaction_order",
    name: "transaction_order",
    component: () => import("../views/TransactionOrder.vue")
  },
  {
    path: "/table",
    name: "table",
    component: () => import("../views/Table.vue")
  },
  {
    path: "/",
    name: "register",
    component: () => import("../views/TableRegister.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
