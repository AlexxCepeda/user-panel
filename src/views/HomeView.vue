<template>
  <div class="flex items-center flex-col justify-center vertical-center">
    <h1 class="text-center text-2xl text-sky-400 font-bold">
      Welcome to your users panel!
    </h1>
    <RouterLink :to="{ name: 'users' }" class="underline">Go users</RouterLink>
  </div>
</template>

<script setup></script>
