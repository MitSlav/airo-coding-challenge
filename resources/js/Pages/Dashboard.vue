<script setup lang="ts">
import Button from "../components/shared/Button.vue";
import SelectField from "../components/shared/forms/SelectField.vue";
import TagsInput from "../components/shared/forms/TagsInput.vue";
import TextField from "../components/shared/forms/TextField.vue";
</script>

<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <form>
            <div class="space-y-12">
                <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-base/7 font-semibold text-gray-900">
                        Quotation
                    </h2>

                    <div
                        class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                    >
                        <div class="sm:col-span-3">
                            <TagsInput name="age" label="Age" />
                        </div>

                        <div class="sm:col-span-3">
                            <SelectField
                                name="currency"
                                label="Currency"
                                :options="['EUR', 'GBP', 'USD']"
                            />
                        </div>

                        <div class="sm:col-span-3">
                            <TextField
                                name="start-date"
                                label="Start Date"
                                type="date"
                            />
                        </div>

                        <div class="sm:col-span-3">
                            <TextField
                                name="end-date"
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
                    button-label="Cancel"
                />
            </div>
        </form>
    </div>
</template>
