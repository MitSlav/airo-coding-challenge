<script setup>
import { useField } from "vee-validate";

const props = defineProps({
    type: { type: String, default: "text" },
    name: String,
    label: String,
});

const { value, errorMessage, handleChange, handleBlur } = useField(
    () => props.name,
    undefined,
    {
        validateOnValueUpdate: false,
    },
);

const validationListeners = {
    blur: (evt) => handleBlur(evt, true),
    change: handleChange,
    input: (evt) => handleChange(evt, !!errorMessage.value),
};
</script>

<template>
    <div>
        <label :for="name" class="block text-sm/6 font-medium text-gray-900">{{
            label
        }}</label>
        <div class="mt-2">
            <input
                :id="name"
                :type="type"
                :value="value"
                v-on="validationListeners"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                autocomplete="on"
            />
        </div>
        <div
            class="mt-1 text-sm text-red-600 peer-invalid:block"
            v-if="errorMessage"
        >
            {{ errorMessage }}
        </div>
    </div>
</template>
