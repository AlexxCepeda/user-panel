<template>
  <main>
    <div>Home view</div>
  </main>
</template>

<script setup>
import UserService from "@/services/UserService";
import { useModalStore } from "@/stores/modal";
import { onMounted } from "vue";

const modalStore = useModalStore();

onMounted(async () => {
  try {
    modalStore.showLoading();
    await UserService.getUsers();
  } catch (error) {
    console.log(error);
  } finally {
    modalStore.hideLoading();
  }
});
</script>
