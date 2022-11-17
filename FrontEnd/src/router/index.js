import { createRouter, createWebHistory } from "vue-router";
import EventListView from "../views/EventListView.vue";
import UserProfileView from "../views/UserProfileView.vue";
import SignUpLogInFormView from "../views/SignUpLogInFormView.vue";
import EventCreateView from "../views/EventCreateView.vue";
import EventDetailView from "../views/EventDetailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "events",
      component: EventListView,
    },
    {
      path: "/event-detail",
      name: "events-detail",
      component: EventDetailView,
    },
    {
      path: "/profile",
      name: "profile",
      component: UserProfileView,
    },
    {
      path: "/log-in",
      name: "log-in",
      component: SignUpLogInFormView,
    },
    {
      path: "/create-event",
      name: "create-event",
      component: EventCreateView,
    },
  ],
});

export default router;
