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
        path: "/dashboard",
        component: () => import("./Pages/Dashboard.vue"),
        meta: {
            requiresAuth: true,
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from) => {
    const token = localStorage.getItem("token");

    if (to.meta.requiresAuth && !token) {
        return "/login";
    }

    if (to.path === "/login" && token) {
        return "/dashboard";
    }
});

export default router;
