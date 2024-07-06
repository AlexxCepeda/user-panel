import { ref } from "vue";
import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", () => {
  const showLoadingModal = ref(false);

  function showLoading() {
    showLoadingModal.value = true;
  }
  function hideLoading() {
    showLoadingModal.value = false;
  }

  return { showLoadingModal, showLoading, hideLoading };
});
