<template>
  <div class="bg-gray-100 px-4 py-2 rounded-md border flex gap-2">
    <select
      id="filter"
      class="rounded py-1 cursor-pointer"
      :value="type"
      @change="$emit('update:type', $event.target.value)"
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
      :disabled="type == 'any'"
      :value="age"
      @input="$emit('update:age', $event.target.value)"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  age: {
    type: [String, null],
    required: true,
  },
});

const emit = defineEmits(["update:type", "update:age"]);
</script>
