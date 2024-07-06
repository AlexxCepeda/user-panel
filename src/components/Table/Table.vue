<template>
  <div class="my-4 flex justify-between items-center">
    <h3 class="text-xl md:text-2xl font-bold text-sky-400">{{ title }}</h3>
    <!-- <div>
      Filters go here
    </div> -->
  </div>
  <div class="bg-white relative border rounded-lg overflow-x-scroll">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th class="px-4 py-3" v-for="column in columns" :key="column.value">
            {{ column.label }}
          </th>
          <th class="px-4 py-3" v-if="showActions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index" class="border-b">
          <td
            class="px-4 py-3 font-medium text-gray-900 capitalize"
            v-for="column in columns"
            :key="column.value"
          >
            {{
              getPropertyAssociate(item, column.field)
                ? getPropertyAssociate(item, column.field)
                : "-"
            }}
          </td>
          <td v-if="showActions">
            <slot name="actions" :item="item"></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  showActions: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Table",
  },
});

function getPropertyAssociate(obj, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}
</script>
