<template>
  <body class="flex flex-col gap-10 pt-10 items-center h-screen bg-gray-100">
    <h3 class="text-3xl font-bold text-blue-700">Login</h3>
    <form @submit.prevent="submit" class="mx-auto w-full max-w-sm rounded-lg shadow-md px-8 py-6">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Your Email:</label>
        <input type="email" id="email" v-model="email" required class="rounded-md border border-gray-300 py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Your Password:</label>
        <input type="password" id="password" v-model="password" required class="rounded-md border border-gray-300 py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center">
          <!-- <input type="checkbox" id="rememberMe" v-model="rememberMe" class="mr-2"> -->
          <label for="rememberMe" class="text-sm text-gray-700">Remember Me</label>
        </div>
        <a href="/forget-password" class="text-sm text-blue-500 hover:underline">Forgot Password?</a>
      </div>
      <button type="submit" :loading="loading" class="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-md focus:outline-none">
        Submit
      </button>
      <div class="text-center mt-4 text-sm">
        New user? <RouterLink to="/register" class="text-blue-500 hover:underline">Register Now</RouterLink>
      </div>
    </form>
  </body>
</template>


<script setup lang="ts">
import {ref, watch} from "vue"
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import { useMainStore } from "@/store/MainStore";
const email = ref<string>('')
const password = ref<string>('')
const loading =ref<boolean>(false)
const mainStore = useMainStore()
const router = useRouter()
// variables


// const logOut = async ()=>{
//   try {
//     await signOut(auth);
//     console.log('User logged out successfully'); // Optional for logging
//   } catch (error) {
//     console.error('Error logging out:', error); // Handle errors if needed
//   }
// }
// methods

const submit = async ()=>{
  await mainStore.login(email.value,password.value)
}


// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is logged in
//    console.log('logged',user)
//   } else {
//     // User is not logged in
//     console.log('false')
//   }
// });
watch(()=>mainStore.isLogged,(newval:boolean)=>{
  newval === true?router.push({name:'dashboard'}):false
})
</script>