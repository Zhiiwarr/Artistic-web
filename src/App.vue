<template>
  <div>
    <!-- <header class="flex items-center justify-between bg-gray-800 text-white px-4 py-2 shadow-md">
  <div class="flex items-center">
    <h1 class="text-xl font-bold mr-4">Art Gallery</h1>
    <RouterLink :to="{name:'manage-item'}" href="#" class="text-blue-500 hover:underline">Manage Art</RouterLink>
  </div>
  <nav class="flex space-x-4">
    <RouterLink :to="{name:'add-item'}" href="#" class="text-blue-500 hover:underline">Add Art</RouterLink>
    <RouterLink :to="{name:'add-item'}" href="#" class="text-blue-500 hover:underline">Profile</RouterLink>
  </nav>
</header> -->
<RouterView></RouterView>
  </div>
</template>
<script setup lang="ts">

import { RouterView } from "vue-router";
</script>