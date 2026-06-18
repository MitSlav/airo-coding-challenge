import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",
        component: () => import("./Pages/Login.vue"),
    },
    {
        path: "/test",
        component: () => import("./Pages/TestRoute.vue"),
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
