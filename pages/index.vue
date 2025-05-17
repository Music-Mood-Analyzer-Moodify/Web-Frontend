<template>
  <div>
    <h1>Log-in / Register</h1>
    <div>
      <h2>Log in with credentials</h2>
      <form>
        <div class="form-group">
          <input
            v-model="login_email"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div class="form-group">
          <input
            v-model="login_password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <p .login_error v-if="login_error">
          {{ login_error }}
        </p>
        <button @click.prevent="loginWithCredentials">
          Log in with credentials
        </button>
      </form>
    </div>
    <div>
      <h2>Log in or register with Google</h2>
      <p>Click the button below to log in with your Google account.</p>
      <button @click="loginWithGoogle">Log in with Google</button>
    </div>
    <div>
      <h2>Register with credentials</h2>
      <form>
        <div class="form-group">
          <input
            v-model="register_email"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div class="form-group">
          <input
            v-model="register_password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <p .register_error>
          {{ register_error }}
        </p>
        <button @click.prevent="registerWithCredentials">
          Log in with credentials
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

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
    .then(async (result) => {
      let token = result.user.getIdToken();
      let user = result.user;
      console.log("User signed in:", result.user);
      await navigateTo("/messages");
    })
    .catch((error) => {
      console.error("Error signing in with Google:", error);
    });
};
const login_email = ref("");
const login_password = ref("");
const login_error = ref("");
const loginWithCredentials = async () => {
  console.log("Logging in with credentials...");
  await signInWithEmailAndPassword(
    auth,
    login_email.value,
    login_password.value
  )
    .then(async (result) => {
      console.log("User signed in:", result.user);
      await navigateTo("/messages");
    })
    .catch((error) => {
      console.error("Error signing in with credentials:", error);
      login_error.value = error.message;
    });
};

const register_email = ref("");
const register_password = ref("");
const register_error = ref("");
const registerWithCredentials = async () => {
  console.log("Registering with credentials...");
  await createUserWithEmailAndPassword(
    auth,
    register_email.value,
    register_password.value
  )
    .then(async (result) => {
      console.log("User registered:", result.user);
      await navigateTo("/messages");
    })
    .catch((error) => {
      console.error("Error registering with credentials:", error);
      register_error.value = error.message;
    });
};

onMounted(() => {
  return {
    provide: {
      auth,
      loginWithGoogle,
      loginWithCredentials,
      registerWithCredentials,
    },
  };
});
</script>
<style scoped>
.form-group {
  margin-bottom: 1em;
}
input {
  display: block;
  width: 50%;
  box-sizing: border-box;
}
</style>
