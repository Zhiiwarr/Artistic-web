<template>
    <div class="container px-4 mx-auto bg-gray-200">
      <div class="max-w-xl p-8 mx-auto mt-10 bg-white rounded-lg shadow-md">
        <h1 class="mb-6 text-2xl font-bold text-center">Profile</h1>
        <form @submit.prevent="updateProfile">
          <div class="mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="name">
              Name
            </label>
            <input
              v-model="userName"
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="description">
              Description
            </label>
            <textarea
              v-model="userDescription"
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Enter a description"
            ></textarea>
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="description">
             Number of prodcuts
            </label>
            {{ list?list.length:0 }}
          </div>
          <div class="flex items-center justify-between">
            <button
              class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref ,onMounted} from 'vue';
  import { useMainStore } from '@/store/MainStore';
  import { db, getDocumentsByQuery } from '@/firebase/firebase'; // Import Firebase database instance
  import { doc, updateDoc,setDoc,getDoc } from 'firebase/firestore';
  
  // Initialize main store and reactive user data
  const mainStore = useMainStore();
  const userName = ref(mainStore.user.name);
  const userDescription = ref(mainStore.user.description);
  const list = ref()
  onMounted(async () => {
   list.value = await getDocumentsByQuery('items','id',mainStore.user.uid)
    console.log(list)
    const docRef = doc(db,'users',mainStore.user.uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  userName.value = docSnap.data().name
  userDescription.value = docSnap.data().description
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
  })
  // Function to update profile
  const updateProfile = async () => {
    try {
      const userDoc = doc(db, 'user', mainStore.user.uid); // Assumes user's UID is stored in mainStore
      await updateDoc(userDoc, {
        name: userName.value,
        description: userDescription.value,
      });
      // Update local store with new values
      mainStore.user.name = userName.value;
      mainStore.user.description = userDescription.value;
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error.message);
      alert('Error updating profile');
    }
  };
  </script>
  
  <style scoped>
  /* Additional styles if necessary */
  </style>
  