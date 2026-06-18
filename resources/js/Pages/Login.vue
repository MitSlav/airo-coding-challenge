<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2
                class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
            >
                Sign in to your account
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="onSubmit" novalidate>
                <TextField name="email" label="Email" type="email" />

                <TextField name="password" label="Password" type="password" />

                <div>
                    <button
                        type="submit"
                        :disabled="isSubmitting"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {{ isSubmitting ? "Signing In..." : "Sign In" }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import { object, string } from "yup";
import TextField from "../components/shared/forms/TextField.vue";
import axios from "axios";

const validationSchema = object({
    email: string().email("Invalid email").required("Email is required"),
    password: string().required("Password is required"),
});

const { handleSubmit, errors, isSubmitting } = useForm({
    validationSchema,
});

const onSubmit = handleSubmit(async (values, { setFieldError }) => {
    try {
        const response = await axios.post("/api/login", values);
        console.log(response.data);
    } catch (error) {
        console.error(error);
        setFieldError("email", error.response.data.errors.email);
    } finally {
        console.log("Request completed");
    }
});
</script>
