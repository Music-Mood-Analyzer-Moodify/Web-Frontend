<template>
  <div>
    <h1>Log-in / Register</h1>
    <button @click="loginWithGoogle">Log in with Google</button>
  </div>
</template>

<script setup lang="ts">
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const runtimeConfig = useRuntimeConfig();
const firebaseConfig = {
  apiKey: runtimeConfig.public.apiKey,
  authDomain: runtimeConfig.public.authDomain,
  projectId: runtimeConfig.public.projectId,
  storageBucket: runtimeConfig.public.storageBucket,
  messagingSenderId: runtimeConfig.public.messagingSenderId,
  appId: runtimeConfig.public.appId,
  measurementId: runtimeConfig.public.measurementId,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const loginWithGoogle = async () => {
  console.log("Logging in with Google...");
  await signInWithPopup(auth, provider)
    .then((result) => {
      let token = result.user.getIdToken();
      let user = result.user;
      console.log("User signed in:", result.user);
    })
    .catch((error) => {
      console.error("Error signing in with Google:", error);
    });
  await navigateTo("/messages");
};

onMounted(() => {
  return {
    provide: {
      auth,
      loginWithGoogle,
    },
  };
});
</script>
