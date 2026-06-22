<script setup>
import iziToast from "izitoast";
import Button from "../components/shared/Button.vue";
import router from "../router.js";
import axiosInstance from "../services/axiosInstance.js";

const logout = async () => {
    const result = await axiosInstance.post("/logout");
    if (result.status === 200) {
        localStorage.removeItem("token");
        iziToast.success({
            title: "Success!",
            message: "User logged out.",
        });
        router.push("/login");
    }
};
</script>

<template>
    <Button
        @click="logout"
        class="text-sm/6 font-semibold text-gray-900"
        button-label="Logout"
    />
</template>
