<template>
  <body class="flex flex-col items-center h-screen gap-10 pt-10 bg-gray-100">
    <h3 class="text-3xl font-bold text-blue-700">Create your account</h3>
    <form @submit.prevent="handleRegister" class="w-full max-w-sm px-8 py-6 mx-auto bg-white rounded-lg shadow-md">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Username:</label>
        <input type="text" id="name" v-model="name" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Your Email:</label>
        <input type="email" id="email" v-model="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Your Password:</label>
        <input type="password" id="password" v-model="password" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      <div class="mb-4">
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>

      <div v-if="errorState.hasError" class="mb-4 text-red-500">
        {{ errorState.errorMessage }}
      </div>

      <button type="submit" :loading="loading" class="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none">
        Register
      </button>
    </form>
  </body>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { setDocument } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useMainStore } from "@/store/MainStore";
import { auth } from "@/firebase/firebase";
import { useRouter } from "vue-router";
const router = useRouter()
const name = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');
const  mainStore = useMainStore()
const loading = ref<boolean>(false);
const errorState = reactive({
  hasError: false,
  errorMessage: '',
});

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    errorState.hasError = true;
    errorState.errorMessage = 'Passwords do not match.';
    return;
  }

  loading.value = true;
  try {
    // router.push({name:'manage-item'})
   const user = await createUserWithEmailAndPassword(auth, email.value, password.value);
   window.localStorage.setItem('userT',JSON.stringify(user.user))
   const userId = user.user.uid
   mainStore.user = user.user
   setDocument('users',userId,{
    email: email.value,
    name: name.value,
    id:userId,
    role:'user'
   })
   console.log('why not here')
   setTimeout(()=>{
    router.push({name:'manage-item'})
   },2000)
    // Registration successful, redirect or handle further logic here
  } catch (error:any) {
    errorState.hasError = true;
    console.log('or error')
    // // Handle specific error codes
    // if (error.code === 'auth/invalid-email') {
    //   errorState.errorMessage = 'Please enter a valid email address.';
    // } else {
    //   errorState.errorMessage = 'Registration failed. Please try again.';
    // }
  } finally {
    loading.value = false;
  }
};

</script>

<style>
input {
  background-color: rgba(155, 155, 155, 0.356);
}
</style>
