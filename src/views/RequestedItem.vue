<template>
    <div class="container bg-gray-200 mx-auto px-4">
      <div class="p-10"></div>
      <div class="overflow-x-auto">
        <table class="table-auto w-full rounded-lg shadow-md bg-white">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
                #
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Description
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Price
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Offer
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item,index in items" :key="item.id" >
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
               {{ index +1 }}
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
               {{ item.name }}
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
                {{ item.description }}
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
                {{ item.price }}
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
                
                {{ item.process }}
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
                <div class="flex justify-start items-center gap-2">
                  <button @click="handleUpdate('accept',item.did)" class="text-white p-3 rounded-lg bg-emerald-500">{{ item.process=='accept'?'accepted':'acept' }}</button>
                  <button  @click="handleUpdate('reject',item.did)" class="text-white p-3 rounded-lg bg-rose-500">{{ item.process=='reject'?'rejected':'reject' }}</button>
                </div>
              </th>
            </tr>
        
            </tbody>
        </table>
      </div>
    </div>
  </template>

  <script setup>
import { getCollection,getDocument,getDocumentsByQuery, updateDocument } from '@/firebase/firebase';
import { useMainStore } from '@/store/MainStore';
const mainStore = useMainStore()
import { ref } from 'vue';
import { onMounted } from 'vue';
const items = ref([])
onMounted(async()=>{
  const documentId = await getDocumentsByQuery('reqests','ownerId',mainStore.user.uid)

  console.log(documentId,'it must be 2')
  const list = await getCollection('items')
  list.forEach((obj)=>{
    console.log(obj)
    documentId.forEach((item)=>{
      if(obj.did == item.productId){
        items.value.push(obj)
      }
      console.log()
   })
  })
})
const handleUpdate  = async (value,id)=>{
  await updateDocument('items',id,{process:value})
  const documentId = await getDocumentsByQuery('reqests','ownerId',mainStore.user.uid)
  const list = await getCollection('items')
  items.value = []
  list.forEach((obj)=>{
    console.log(obj)
    documentId.forEach((item)=>{
      if(obj.did == item.productId){
      
        items.value.push(obj)
      }
      console.log()
   })
  })
}
</script>
  