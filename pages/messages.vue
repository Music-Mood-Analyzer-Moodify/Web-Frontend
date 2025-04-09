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
    <ul class="message-list">
      <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
import { app } from "../middleware/firebase.js";

const router = useRouter();
const auth = getAuth(app);
const messages = ref([]);
const newMessage = ref("");

// Check authentication state when component mounts
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.push("/");
    }
  });
});

const sendMessage = () => {
  if (newMessage.value.trim()) {
    messages.value.push(newMessage.value);
    newMessage.value = "";
  }
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
  background-color: #f1f1f1;
  border-radius: 4px;
}
</style>
