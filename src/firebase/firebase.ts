// @ts-nocheck

import { initializeApp } from 'firebase/app'
import { useCollection,useDocument } from 'vuefire'
import { User } from '@/type/types'
import { getAuth } from 'firebase/auth'
import { getStorage,ref as RRef, uploadBytes ,getDownloadURL } from 'firebase/storage'
import { getFirestore,doc, collection,setDoc,addDoc, where } from 'firebase/firestore'
import { useActionStore } from '@/store/ActionStore'
import { getDocs, getDoc } from "firebase/firestore";
import { query } from 'firebase/database'
import {  updateDoc } from 'firebase/firestore';
// ... other firebase imports
const firebaseConfig = {

  apiKey: "AIzaSyBQsJ_vlhx1V5v1a6nG79cq1r1KLMTYuis",

  authDomain: "marketbase-e1978.firebaseapp.com",

  projectId: "marketbase-e1978",

  storageBucket: "marketbase-e1978.appspot.com",

  messagingSenderId: "714461113144",

  appId: "1:714461113144:web:1e7b0c1d10f52a6b212fcd"

};


export const firebaseApp = initializeApp(firebaseConfig)


export const db = getFirestore(firebaseApp)
export const auth = getAuth( firebaseApp)


export const getCollection = async (collectionName:string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents  :any = [];
    querySnapshot.forEach((doc) => {
      documents.push({ did: doc.id, ...doc.data() });
    });
    return documents;
  } catch (error) {
    console.error("Error getting collection: ", error);
    throw error;
  }
};

// Method to get a specific document by ID
export const getDocument = async (collectionName:string, documentId:string) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    console.log(documentId,'ss')
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { did: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    throw error;
  }
};

export const setDocument = async (collectionName:string,documentId:string ,User:any)=>{
    await setDoc(doc(db, collectionName, documentId), User);
}
export const getDocumentsByQuery = async (collectionName:string, queryField:string, queryValue:string) => {
  try {
    const colRef = collection(db, collectionName);
    const q = query(colRef, where(queryField, "==", queryValue));
    const querySnapshot = await getDocs(q);
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    return documents;
  } catch (error) {
    console.error("Error getting documents by query: ", error);
    throw error;
  }
};
export const updateDocument = async (collectionName:string, documentId:string, updateData:object) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, updateData);
    console.log(`Document ${documentId} in ${collectionName} updated successfully.`);
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};
export const setDocumentRandomId = async (collectionName: string, User: any) => {
    await addDoc(collection(db, collectionName), User);
}
const storage = getStorage(firebaseApp)
export const uploadImage = async (image: File) => {
    const actionStore = useActionStore()
    const storageRef = RRef(storage, `images/${image.name}`);
  
    try {
      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);
    
      actionStore.imageUrl = downloadURL
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error; // Re-throw the error for better handling (optional)
    }
  };
  
// here we can export reusable database references
// export const todosRef = collection(db, 'todos')