<template>
  <form class="flex flex-row gap-2">
    <label
      v-for="option in options"
      :key="option.value"
      class="flex items-center"
    >
      <input
        type="radio"
        :value="option.value"
        :checked="modelValue === option.value"
        @change="updateValue(option.value)"
        class="mr-2"
      />
      <span class="capitalize">{{ option.label }}</span>
    </label>
  </form>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
    validator(value) {
      return value.every((option) => "value" in option && "label" in option);
    },
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (value) => {
  emit("update:modelValue", value);
};
</script>
