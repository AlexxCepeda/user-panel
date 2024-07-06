<template>
  <div class="bg-gray-100 px-4 py-2 rounded-md border flex gap-2">
    <select
      id="filter"
      class="rounded py-1 cursor-pointer"
      v-model="filter.type"
      @change="updateFilter"
    >
      <option value="any">Any</option>
      <option value="greater">></option>
      <option value="equals">=</option>
      <option value="less"><</option>
    </select>
    <input
      type="number"
      id="age"
      class="w-full disabled:bg-white cursor-not-allowed rounded"
      :disabled="filter.type == 'any'"
      v-model="filter.ageNumber"
      @input="updateFilter"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const filter = ref({ ...props.modelValue });

watch(
  filter,
  (newFilter) => {
    emit("update:modelValue", { ...newFilter });
  },
  { deep: true }
);
</script>
