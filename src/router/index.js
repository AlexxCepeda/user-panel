import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotFound from "../components/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/users",
      name: "users",
      component: () => import("../views/UsersView.vue"),
      // children: [
      //   {
      //     path: ":id",
      //     name: "user-detail",
      //     component: () => import("../views/UserDetailView.vue"),
      //   },
      // ],
    },
    {
      path: "/users/:id",
      name: "user-detail",
      component: () => import("../views/UserDetailView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound,
    },
  ],
});

export default router;
