<template>
  <div class="bg-gray-300 rounded h-56 p-4 space-y-2 overflow-scroll">
    <div class="flex justify-around items-center gap-2">
      <img
        :src="data.picture.thumbnail"
        :alt="data.name.first"
        class="w-16 rounded-full border border-gray-900"
      />
      <h2 class="text-lg font-bold">
        {{ getFullName(data.name.first, data.name.last) }}
      </h2>
    </div>

    <div class="flex gap-2 items-center">
      <h5 class="text-xl font-semibold">Age:</h5>
      <h6 class="text-md">{{ data.dob.age }}</h6>
    </div>
    <div class="flex gap-2 items-center">
      <h5 class="text-xl font-semibold">Gender:</h5>
      <h6 class="text-md capitalize">{{ data.gender }}</h6>
    </div>
    <div class="flex items-center md:flex-col gap-1 md:items-start">
      <h5 class="text-xl font-semibold">Location:</h5>
      <h6 class="text-md">
        {{ parseLocation(data.location.city, data.location.country) }}
      </h6>
    </div>
    <div class="flex items-center md:flex-col gap-1 md:items-start">
      <h5 class="text-xl font-semibold">Email:</h5>
      <h6 class="text-md">
        {{ data.email }}
      </h6>
    </div>
    <div class="flex md:flex-col gap-2 mx-auto mt-4">
      <button
        class="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded w-full"
      >
        Details
      </button>
      <button
        class="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded w-full"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { getFullName, parseLocation } from "@/utils/index";

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
