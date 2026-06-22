<template>
    <button :type :disabled="isSubmitting" class="cursor-pointer">
        {{ isSubmitting ? "Submitting..." : buttonLabel }}
    </button>
</template>

<script setup>
defineProps({
    type: {
        type: String,
        default: "button",
    },
    isSubmitting: Boolean,
    buttonLabel: String,
});
</script>
