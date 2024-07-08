<template>
  <div class="my-4 flex justify-between items-center">
    <h3 class="text-xl md:text-2xl font-bold text-sky-400">{{ title }}</h3>
    <div class="flex items-center gap-2">
      <button
        @click="handleExportCSV"
        v-if="showDownload"
        :disabled="!tableHasData"
        class="bg-green-500 shadow py-2 px-3 rounded-full flex items-center disabled:bg-gray-400"
      >
        <svg
          class="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />

          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            <path
              d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
              stroke="#ffffff"
              stroke-width="1.392"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
              stroke="#ffffff"
              stroke-width="1.392"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
      </button>
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
          v-if="tableHasData"
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
import { useCsvExport } from "@/composables/useCsvExport";
import { getPropertyAssociate } from "@/utils/index";
import { useModalStore } from "@/stores/modal";

const modalStore = useModalStore();

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
  showDownload: {
    type: Boolean,
    default: false,
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

const { exportCSV } = useCsvExport();

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

const tableHasData = computed(() => filteredData.value.length > 0);

function cleanFilters() {
  countryFilter.value = "";
  genderFilter.value = "all";
  nextTick(() => {
    ageFilter.value = { type: "any", ageNumber: null };
  });
}

async function handleExportCSV() {
  try {
    modalStore.showLoading();
    exportCSV(props.columns, filteredData.value, "users.csv");
  } catch (error) {
    console.log("ERROR:", error);
  } finally {
    setTimeout(() => modalStore.hideLoading(), 2000); //Just for simulating
  }
}
</script>
