<template>
  <form class="flex flex-col items-start">
    <label class="sr-only">Country</label>
    <div class="relative w-full">
      <input
        type="text"
        placeholder="Country"
        :value="modelValue"
        @input="updateValue($event.target.value)"
        class="bg-gray-50 border border-gray-300 text-gray-900 p-2 rounded-md"
      />
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (value) => {
  emit("update:modelValue", value);
};
</script>
