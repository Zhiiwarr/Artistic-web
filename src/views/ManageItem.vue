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
              Quantity
            </th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in mainStore.listItem" :key="item.idd">
            <td class="border px-4 py-2 text-left text-sm text-gray-600">
              {{ index + 1 }}
            </td>
            <td class="border px-4 py-2 text-left text-sm text-gray-600">
              {{ item.name }}
            </td>
            <td class="border px-4 py-2 text-left text-sm text-gray-600">
              {{ item.description }}
            </td>
            <td class="border px-4 py-2 text-left text-sm text-gray-600">
              {{ item.price }}
            </td>
            <td class="border px-4 py-2 text-left text-sm text-gray-600">
              {{ item.quantity }}
            </td>
            <td class="border px-4 py-2 text-left text-sm">
              <button
                @click="deleteItem(item.idd)"
                class="text-white bg-red-500 px-3 py-1 rounded-full hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>


<script setup>
import { db } from '@/firebase/firebase'; // Import Firebase database instance
import { getDocs, collection, where, query, deleteDoc, doc } from 'firebase/firestore';
import { useMainStore } from '@/store/MainStore';
import {onUnmounted} from "vue"
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
// Initialize items as empty array
const mainStore = useMainStore();

// Fetch items from Firestore
const fetchItems = async () => {
  try {
    const collectionRef = collection(db, "items");
    const uid = mainStore.user.uid; // Assuming uid is in mainStore.user

    if (!uid) {
      console.error("User ID not found in mainStore.user");
      return; // Handle the case where user ID is not available
    }

    const q = query(collectionRef, where("id", "==", uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.docs.forEach((doc) => {
      console.log(doc.id,'here')
      mainStore.listItem.push({
        idd: doc.id,
        ...doc.data(),
      });
    });
  } catch (error) {
    console.error("Error fetching items:", error.message);
  }
};
onUnmounted(() => {
 mainStore.listItem = []
})
// Delete item from Firestore and remove it from local items array
const deleteItem = async (itemId) => {
  try {
    console.log('itemid',itemId)
    await deleteDoc(doc(db, 'items', itemId));
    mainStore.listItem = mainStore.listItem.filter(item => item.idd !== itemId);
  } catch (error) {
    console.error('Error deleting item:', error.message);
  }
};

// Fetch items when component is mounted
fetchItems();




</script>
