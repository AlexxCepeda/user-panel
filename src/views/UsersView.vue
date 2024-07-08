<template>
  <div class="pb-10">
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
    <Dialog
      :isOpen="showDialog"
      title="Estimado cliente"
      :description="descriptionDialog"
      @close="showDialog = false"
      @accept="handleDeleteDialog"
    />
  </div>
</template>

<script setup>
import UserService from "@/services/UserService";
import { useModalStore } from "@/stores/modal";
import { useUsersStore } from "@/stores/users";
import { onMounted, ref } from "vue";
import Table from "@/components/Table/Table.vue";
import Dialog from "@/components/Dialog.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const modalStore = useModalStore();
const usersStore = useUsersStore();
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

const showDialog = ref(false);
const descriptionDialog = ref("");

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
  usersStore.setSelectedUser(item);
  router.push({ name: "user-detail", params: { id: item.login.uuid } });
}
function handleDelete(item) {
  descriptionDialog.value = "Realmente desea eliminar el usuario?";
  showDialog.value = true;
}

function handleDeleteDialog() {
  descriptionDialog.value = "El usuario esta siendo eliminado...";
  setTimeout(() => {
    showDialog.value = false;
  }, 1000);
}
</script>
