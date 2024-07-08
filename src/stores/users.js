import { ref } from "vue";
import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", () => {
  const selectedUser = ref({});

  function setSelectedUser(item) {
    selectedUser.value = item;
  }
  function resetSelectedUser() {
    selectedUser.value = {};
  }

  return { selectedUser, setSelectedUser, resetSelectedUser };
});
