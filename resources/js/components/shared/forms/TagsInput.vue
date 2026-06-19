<script setup lang="ts">
import { ref } from "vue";
import {
    TagsInputInput,
    TagsInputItem,
    TagsInputItemDelete,
    TagsInputItemText,
    TagsInputRoot,
} from "radix-vue";
import { Icon } from "@iconify/vue";
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
        initialValue: [28, 35],
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
        <label :for="name" class="block text-sm/6 font-medium text-gray-900">
            {{ label }}
        </label>

        <div class="mt-2">
            <TagsInputRoot
                :id="name"
                :type="type"
                v-model="value"
                @blur="handleBlur"
                class="w-full rounded-md bg-white p-1 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 sm:text-sm/6 flex flex-wrap gap-2"
            >
                <TagsInputItem
                    v-for="item in value"
                    :key="item"
                    :value="item"
                    class="inline-flex items-center gap-1 rounded-md bg-indigo-100 px-2 py-1 text-sm text-indigo-700"
                >
                    <TagsInputItemText />

                    <TagsInputItemDelete
                        class="rounded hover:bg-indigo-200 p-0.5"
                    >
                        <Icon icon="lucide:x" class="h-3 w-3" />
                    </TagsInputItemDelete>
                </TagsInputItem>

                <TagsInputInput
                    placeholder="Enter ages..."
                    class="flex-1 min-w-25 bg-transparent outline-none text-base text-gray-900 placeholder:text-gray-400 sm:text-sm/6"
                />
            </TagsInputRoot>
        </div>
        <div v-if="errorMessage" class="mt-1 text-sm text-red-600">
            {{ errorMessage }}
        </div>
    </div>
</template>
