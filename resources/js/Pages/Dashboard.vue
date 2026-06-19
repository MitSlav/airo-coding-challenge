<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <form @submit.prevent="onSubmit" novalidate>
            <div class="space-y-12">
                <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-base/7 font-semibold text-gray-900">
                        Quotation
                    </h2>

                    <div
                        class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                    >
                        <div class="sm:col-span-3">
                            <TagsInput name="age" label="Age" :initial-value="[28, 35]" />
                        </div>

                        <div class="sm:col-span-3">
                            <SelectField
                                name="currency"
                                label="Currency"
                                :options="validOptions"
                            />
                        </div>

                        <div class="sm:col-span-3">
                            <TextField
                                name="startDate"
                                label="Start Date"
                                type="date"
                            />
                        </div>

                        <div class="sm:col-span-3">
                            <TextField
                                name="endDate"
                                label="End Date"
                                type="date"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
                <Button
                    class="text-sm/6 font-semibold text-gray-900"
                    button-label="Cancel"
                />
                <Button
                    type="submit"
                    class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    button-label="Submit"
                />
            </div>
        </form>
    </div>
</template>

<script setup>
import Button from "../components/shared/Button.vue";
import SelectField from "../components/shared/forms/SelectField.vue";
import TagsInput from "../components/shared/forms/TagsInput.vue";
import TextField from "../components/shared/forms/TextField.vue";

import { useForm } from "vee-validate";
import { array, date, number, object, string } from "yup";
import axios from "axios";

const validOptions = ["EUR", "GBP", "USD"];
const validationSchema = object({
    age: array()
        .of(
            number()
                .typeError("Age must be a valid number")
                .min(0, "Age must be at least 0")
                .max(120, "Age must be 120 or less")
        )
        .min(1, "At least one age is required")
        .required("Age is required"),
    currency: string()
        .required("Currency is required")
        .oneOf(validOptions, "Invalid option selected"),
    startDate: date()
        .required("Start Date is required")
        .typeError("Please enter a valid date"),
    endDate: date()
        .required("End Date is required")
        .typeError("Please enter a valid date"),
});

const { handleSubmit, errors, isSubmitting } = useForm({
    validationSchema,
});

const onSubmit = handleSubmit(async (values, { setFieldError }) => {
    try {
        // const response = await axios.post("/api/login", values);
        // localStorage.setItem("token", response.data.token);
        // window.location.href = "/dashboard";
    } catch (error) {
        setFieldError("email", error.response.data.errors.email);
    }
});
</script>
