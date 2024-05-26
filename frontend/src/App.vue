<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import useAuth from './composables/useAuth';
import { useAuthStore } from './stores/useAuthStore';
const { getUser } = useAuth();
const store = useAuthStore();

onMounted(() => {
  if (store.access_token) {
    getUser();
  }
})

</script>

<template>
  <RouterView />
</template>

<style scoped></style>
