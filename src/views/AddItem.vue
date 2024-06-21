<template>
  <div class="container flex items-center justify-center h-screen">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-xl card">
      <h2 class="mb-6 text-3xl font-extrabold text-center text-transparent card-title bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700">Add New Item</h2>
      <form id="item-form" @submit.prevent="submitForm" class="space-y-6">
        <div class="flex flex-col form-group">
          <label for="name" class="text-sm font-semibold text-gray-600">Item Name:</label>
          <input type="text" id="name" name="name" v-model="form.name" required class="px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
        </div>
        <div class="flex flex-col form-group">
          <label for="price" class="text-sm font-semibold text-gray-600">Price:</label>
          <input type="number" id="price" name="price" v-model="form.price" required class="px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
        </div>
        <div class="flex flex-col form-group">
          <label for="quantity" class="text-sm font-semibold text-gray-600">Quantity:</label>
          <input type="number" id="quantity" name="quantity" v-model="form.quantity" required class="px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
        </div>
        <div class="flex flex-col form-group">
          <label for="image" class="text-sm font-semibold text-gray-600">Item Image:</label>
          <input type="file" id="image" name="image" @change="handleUploadImage" required class="px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
        </div>
        <div class="flex flex-col form-group">
          <label for="description" class="text-sm font-semibold text-gray-600">Description:</label>
          <textarea id="description" name="description" v-model="form.description" rows="3" required class="px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
        </div>
        <button type="submit" class="flex items-center justify-center w-full px-4 py-3 font-bold text-white transition-all duration-200 rounded-md btn primary bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none">
          <span class="mr-2">Submit</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>



<script setup lang="ts">
import { reactive } from 'vue';
import {Item}from "@/type/types"
import { useActionStore } from '@/store/ActionStore';
import { useMainStore } from '@/store/MainStore';
import { uploadImage } from '@/firebase/firebase';

const handleUploadImage = (event:any)=>{
  form.image = event.target.files[0]
}
const actionStore = useActionStore()
const mainStore = useMainStore()
const form = reactive<Item>({
  description: '',
  id: mainStore.user.uid,
  name: '',
  price: 0,
  quantity: 0,
  image: '' 
});

const submitForm = async () => {
  // @ts-ignore
 await uploadImage(form.image)
  // console.log(uploadImage(form.image),'here')
 await  actionStore.addItem(form)
form.description = '',
form.id = '',
form.name = '',
form.price = 0,
form.quantity = 0,
form.image=''
};
</script>

<style scoped>
.v-application--wrap {
  min-height: 100vh;
}
input {
  background-color: antiquewhite;
}
</style>
