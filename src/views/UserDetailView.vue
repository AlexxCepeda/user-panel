<template>
  <div class="grid md:grid-cols-2 gap-4 h-full md:h-[80vh] text-white">
    <div
      class="flex flex-col items-center gap-2 bg-gray-700 shadow-lg rounded-lg p-6"
    >
      <div
        class="relative"
        @mouseenter="showButton = true"
        @mouseleave="showButton = false"
      >
        <img
          :src="userStore.selectedUser?.picture?.large"
          :alt="userStore.selectedUser?.name?.first"
          class="w-52 rounded-full border border-gray-900"
        />
        <button
          v-if="showButton"
          @click="handleButtonClick"
          class="absolute left-1/4 top-1/2 bg-red-500 text-white p-2 rounded shadow-lg transition-opacity"
        >
          Delete user
        </button>
      </div>

      <h1 class="text-xl sm:text-3xl font-bold">
        {{
          getFullName(
            userStore.selectedUser?.name?.first,
            userStore.selectedUser?.name?.last
          )
        }}
      </h1>
      <div class="w-full h-full flex flex-col justify-evenly">
        <div
          class="flex items-center justify-between px-4 border-b-2 border-white py-2"
        >
          <h1 class="text-xl md:text-2xl font-semibold">Age:</h1>
          <h4 class="text-xl">{{ userStore.selectedUser?.dob?.age }}</h4>
        </div>
        <div
          class="flex gap-2 items-center justify-between px-4 border-b-2 border-white py-2"
        >
          <h1 class="text-xl md:text-2xl font-semibold">City:</h1>
          <h4 class="text-xl">{{ userStore.selectedUser?.location?.city }}</h4>
        </div>
        <div
          class="flex gap-2 items-center justify-between px-4 border-b-2 border-white py-2"
        >
          <h1 class="text-xl md:text-2xl font-semibold">Country:</h1>
          <h4 class="text-xl">
            {{ userStore.selectedUser?.location?.country }}
          </h4>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-6 items-center">
      <div class="card-wrapper pb-2">
        <p class="px-4 py-2">Users details</p>
        <hr class="mb-4" />
        <div class="space-y-4">
          <div class="flex gap-2 items-center justify-between px-4 py-2">
            <h1 class="text-xl md:text-2xl font-semibold">Gender:</h1>
            <h4 class="text-xl capitalize">
              {{ userStore.selectedUser?.gender }}
            </h4>
          </div>
          <div
            class="flex gap-2 items-center justify-between px-4 py-2 flex-wrap"
          >
            <h1 class="text-xl md:text-2xl font-semibold">Email:</h1>
            <h4 class="text-md md:text-xl capitalize">
              {{ userStore.selectedUser?.email }}
            </h4>
          </div>
          <div class="flex gap-2 items-center justify-between px-4 py-2">
            <h1 class="text-xl md:text-2xl font-semibold">Phone:</h1>
            <h4 class="text-xl capitalize">
              {{ userStore.selectedUser?.phone }}
            </h4>
          </div>
        </div>
      </div>
      <div class="card-wrapper min-h-32">
        <p class="px-4 py-2">Member since</p>
        <hr class="mb-4" />
        <div class="flex justify-center items-center md:h-5/6">
          <h4 class="text-xl text-center capitalize">
            {{ userStore.selectedUser?.registered?.date.split("T")[0] }}
          </h4>
        </div>
      </div>
    </div>
  </div>
  <Dialog
    :isOpen="showDialog"
    title="Estimado cliente"
    :description="descriptionDialog"
    @close="showDialog = false"
    @accept="handleDeleteDialog"
  />
</template>

<script setup>
import Dialog from "@/components/Dialog.vue";
import { useUsersStore } from "@/stores/users";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getFullName } from "@/utils";

const userStore = useUsersStore();
const router = useRouter();
const showButton = ref(false);
const showDialog = ref(false);
const descriptionDialog = ref("");

function handleDeleteDialog() {
  descriptionDialog.value = "El usuario esta siendo eliminado...";
  setTimeout(() => {
    showDialog.value = false;
  }, 1000);
}

onMounted(() => {
  if (Object.keys(userStore.selectedUser).length == 0) {
    router.push({ name: "not-found" });
  }
});

onBeforeUnmount(() => {
  userStore.resetSelectedUser();
});

const handleButtonClick = () => {
  descriptionDialog.value = "Realmente desea eliminar el usuario?";
  showDialog.value = true;
};
</script>
