<template>
  <h1 class="font-3xl font-bold">
    {{ userStore.selectedUser?.name?.first }}
  </h1>
</template>

<script setup>
import { useUsersStore } from "@/stores/users";
import { onBeforeUnmount, onMounted } from "vue";
import { useRouter } from "vue-router";

const userStore = useUsersStore();
const router = useRouter();

onMounted(() => {
  if (Object.keys(userStore.selectedUser).length == 0) {
    router.push({ name: "not-found" });
  }
});

onBeforeUnmount(() => {
  userStore.resetSelectedUser();
});
</script>
