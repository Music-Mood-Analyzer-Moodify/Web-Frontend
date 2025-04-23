<template>
  <div>
    <h1>Messages</h1>
    <div class="message-form">
      <input
        v-model="newMessage"
        placeholder="Type your message..."
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage">Send</button>
    </div>
    <button @click="getMessages">Get Messages</button>
    <ul class="message-list">
      <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { sendMessage as s_message } from "~/server/songService";
import { getMessages as g_messages } from "~/server/analyticsService";

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
const messages = ref([]);
const newMessage = ref("");

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      await navigateTo("/");
    }
  });
});

const sendMessage = async () => {
  if (newMessage.value.trim()) {
    await s_message("token", newMessage.value);
    newMessage.value = "";
  }
};
const getMessages = async () => {
  await g_messages("token").then((messages) => {
    messages.value = messages;
  });
};
</script>

<style scoped>
.message-form {
  display: flex;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 8px;
  margin-right: 10px;
}

button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

.message-list {
  list-style-type: none;
  padding: 0;
}

.message-list li {
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 4px;
}
</style>
