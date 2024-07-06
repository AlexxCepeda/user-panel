<template>
  <div class="my-4 flex justify-between items-center">
    <h3 class="text-xl md:text-2xl font-bold text-sky-400">{{ title }}</h3>
    <div class="flex items-center gap-2">
      <FilterDropdown>
        <template #actions>
          <button class="hover:underline text-sm" @click="cleanFilters">
            Clear all
          </button>
        </template>
        <template #filters>
          <div class="flex gap-2 items-center justify-around">
            <p class="w-2/5 mx-auto text-center">Country</p>
            <CountryFilter v-model="countryFilter" />
          </div>
          <hr />
          <div class="flex gap-2 items-center justify-around">
            <p class="w-2/5 mx-auto text-center">Gender</p>
            <GenderFilter v-model="genderFilter" :options="radioOptions" />
          </div>
          <hr />
          <div class="flex gap-2 items-center justify-around">
            <p class="w-2/5 mx-auto text-center">Age</p>
            <AgeFilter v-model="ageFilter" />
          </div>
        </template>
      </FilterDropdown>
    </div>
  </div>
  <div class="bg-white relative border rounded-lg overflow-x-scroll">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-sky-300">
        <tr>
          <th class="px-4 py-3" v-for="column in columns" :key="column.value">
            {{ column.label }}
          </th>
          <th class="px-4 py-3" v-if="showActions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in filteredData"
          :key="index"
          class="border-b"
          v-if="!!filteredData.length"
        >
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
        <tr v-else>
          <td
            :colspan="columns.length + (showActions ? 1 : 0)"
            class="p-4 text-center"
          >
            No users found
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import CountryFilter from "@/components/Table/CountryFilter.vue";
import GenderFilter from "@/components/Table/GenderFilter.vue";
import FilterDropdown from "@/components/Table/FilterDropdown.vue";
import AgeFilter from "@/components/Table/AgeFilter.vue";

import { computed, ref, nextTick } from "vue";

const props = defineProps({
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

const countryFilter = ref("");
const genderFilter = ref("all");
const ageFilter = ref({ type: "any", ageNumber: null });

const radioOptions = [
  { value: "all", label: "all" },
  { value: "male", label: "male" },
  { value: "female", label: "female" },
];

const filteredData = computed(() => {
  let data = props.data;

  if (genderFilter.value != "all") {
    data = data.filter((item) => item.gender === genderFilter.value);
  }

  if (countryFilter.value !== "") {
    data = data.filter((item) => {
      const { country } = item.location;
      return country
        .toLocaleLowerCase()
        .includes(countryFilter.value.toLocaleLowerCase());
    });
  }

  if (ageFilter.value.type !== "any" && ageFilter.value.ageNumber) {
    switch (ageFilter.value.type) {
      case "greater":
        data = data.filter((item) => item.dob.age > ageFilter.value.ageNumber);
        break;
      case "less":
        data = data.filter((item) => item.dob.age < ageFilter.value.ageNumber);
        break;
      default:
        data = data.filter((item) => item.dob.age == ageFilter.value.ageNumber);
        break;
    }
  }
  return data;
});

function getPropertyAssociate(obj, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

function cleanFilters() {
  countryFilter.value = "";
  genderFilter.value = "all";
  nextTick(() => {
    ageFilter.value = { type: "any", ageNumber: null };
  });
}
</script>
