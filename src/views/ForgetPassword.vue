<template>
  <div class="mx-auto mt-10 w-full md:w-1/2 lg:w-1/3">
    <div class="rounded-lg shadow-md bg-white overflow-hidden px-8 py-10">
      <h3 class="text-3xl font-bold text-blue-700 mb-5">Forgot Password</h3>
      <form class="flex flex-col" @submit.prevent="submitForgotPassword">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email Address:</label>
          <input type="email" id="email" v-model="email" required class="rounded-md border border-gray-300 py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <div class="flex justify-between mt-6">
          <button type="submit" :loading="loading" class="w-full md:w-1/2 bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-md focus:outline-none">
            Send Reset Link
          </button>
          <button type="button" @click="$router.push({ name: 'login' })" class="text-blue-500 hover:text-blue-700">
            Back to Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

  <script setup lang="ts">
  import { ref } from 'vue';
  import { useMainStore } from '@/store/MainStore';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const loading = ref(false);
  const mainStore = useMainStore();
  const router = useRouter();
  
  const submitForgotPassword = async () => {
    try {
      loading.value = true;
      await mainStore.forgotPassword(email.value); // Assuming login store has a forgotPassword method
      router.push({ name: 'login' }); // Redirect back to login after success
    } catch (error) {
      console.error('Error sending reset link:', error);
      // Handle errors gracefully (e.g., display an error message to the user)
    } finally {
      loading.value = false;
    }
  };
  </script>
  <style scoped>
  .v-card {
    @apply rounded-lg border border-gray-200 shadow-md overflow-hidden;
  }
  
  .v-card-text {
    @apply p-8;
  }
  </style>
  