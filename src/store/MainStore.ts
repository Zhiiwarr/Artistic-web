import { defineStore } from "pinia";
import {User} from "@/type/types.ts"
import { getAuth, signInWithEmailAndPassword ,sendPasswordResetEmail } from "firebase/auth";
import {auth } from "@/firebase/firebase"
import { ref } from "vue";
import { Item } from "@/type/types";

export const useMainStore = defineStore('mainStore',()=>{
  const listItem = ref<Item | []>([])
const usersList = ref<User |[]>([])

    // @ts-ignore
    const user =ref<any>(window.localStorage.getItem('userT')?JSON.parse((window.localStorage.getItem('userT'))):null)
    const isLogged = ref<boolean>(false)
    const login = async(email:string,password:string)=>{
        try {
            const userCredential = await  signInWithEmailAndPassword(auth, email, password)
            // @ts-ignore
              user.value  = userCredential.user;
              window.localStorage.setItem('userT',JSON.stringify(user.value))
            isLogged.value = !isLogged.value
             
         
           }catch(error:any){
             throw error.message
           }
         
    }

    const forgotPassword = async (email:string)=>{
        await sendPasswordResetEmail(auth,email).then(()=>{alert("A Password Rest Link sent toyour email")})
        .catch((error)=>{
            alert(error.message)
        })
    }
    return {listItem,user,isLogged,usersList,login,forgotPassword}
})