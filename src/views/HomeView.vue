<template>
  <main>
    <div v-if="!!users.length">
      <Table
        :data="users"
        :columns="columns"
        :showActions="true"
        title="Users"
        :showDownload="true"
      >
        <template #actions="{ item }">
          <div class="flex flex-col md:flex-row md:gap-2">
            <button
              @click="handleDetail(item)"
              class="text-sky-400 hover:underline"
            >
              Details
            </button>
            <button
              @click="handleDelete(item)"
              class="text-red-400 hover:underline"
            >
              Delete
            </button>
          </div>
        </template>
      </Table>
    </div>
  </main>
</template>

<script setup>
import UserService from "@/services/UserService";
import { useModalStore } from "@/stores/modal";
import { onMounted, ref } from "vue";
import Table from "@/components/Table/Table.vue";

const modalStore = useModalStore();
const users = ref([]);
const columns = ref([
  { value: "gender", label: "gender", field: "gender" },
  { value: "firstName", label: "first name", field: "name.first" },
  { value: "lastName", label: "last name", field: "name.last" },
  { value: "city", label: "city", field: "location.city" },
  { value: "country", label: "country", field: "location.country" },
  { value: "age", label: "age", field: "dob.age" },
  { value: "email", label: "e-mail", field: "email" },
]);

onMounted(async () => {
  try {
    modalStore.showLoading();
    const response = await UserService.getUsers();
    users.value = response.data?.results;
  } catch (error) {
    console.log(error);
  } finally {
    modalStore.hideLoading();
  }
});

function handleDetail(item) {
  console.log(item);
}
function handleDelete(item) {
  console.log(item);
}
</script>
