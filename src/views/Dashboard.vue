<template>
  <body class="bg-gray-100 min-h-screen flex flex-row">

    <main class="flex flex-grow">
      <nav class="bg-white shadow-md w-64 flex flex-col justify-between px-4 py-6">
        <div class="flex flex-col space-y-4">
          <RouterLink to="/dashboard/add-item" class="flex items-center px-2 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v16m0-8l-4-4l4-4m0 0v8z"></path>
            </svg>
            <span>Add New Item</span>
          </RouterLink>
          <RouterLink to="/dashboard/manage-item" class="flex items-center px-2 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500">
            <svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V7m0-3a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1z"></path>
            </svg>
            <span>Manage Items</span>
          </RouterLink>
          <RouterLink to="/dashboard/request-item" class="flex items-center px-2 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500">
            <svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V7m0-3a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1z"></path>
            </svg>
            <span>Requseted Items</span>
          </RouterLink>
          <RouterLink to="/dashboard/profile" class="flex items-center px-2 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <svg class="w-5 h-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7-7v.5a.5.5 0 0 1 1 0V9a6 6 0 0 1 6 6v.5a.5.5 0 0 1-1 0v4z"></path>
            </svg>
            <span>Profile</span>
          </RouterLink>
          <button @click="logout()" class="flex items-center px-2 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500">
            <svg class="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 6V4a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 15v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10a3 3 0 0 1-6 0"></path>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <!-- Content Area -->
      <router-view class="flex-grow p-8 bg-gray-100"></router-view>
    </main>

  </body>
</template>
<script setup>
import {RouterView} from "vue-router"
import {auth} from "@/firebase/firebase"
import { signOut } from "firebase/auth";
import { useRouter } from "vue-router";
const router = useRouter()
const logout = async () => {

signOut(auth).then(() => {
  console.log('sign out')
  window.localStorage.removeItem('userT')
  router.push({name:'login'})
}).catch((error) => {
  // An error happened.
});
};
</script>