<template>
  <div>
    <h1>Songs</h1>
    <div class="pagination">
      <button :disabled="currentPage === 0" @click="prevPage">Previous</button>
      <span class="page-info">Page {{ currentPage + 1 }} of {{ totalPages }}</span>
      <button :disabled="currentPage + 1 >= totalPages" @click="nextPage">Next</button>
    </div>
    <div class="filter" v-if="user">
      <label for="emotion">Filter by Emotion:</label>
      <select v-model="selectedEmotion" @change="currentPage = 0; getSongs(currentPage)">
        <option value="">All</option>
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
        <option value="angry">Angry</option>
        <option value="relaxed">Relaxed</option>
        <option value="excited">Excited</option>
      </select>
    </div>
    <div>
      <div v-for="(song, index) in songs" :key="index" class="song-item">
        <h2>{{ song.name }}</h2>
        <p>Artists: {{ song.artistNames.join(", ") }}</p>
        <p>Spotify ID: {{ song.spotifyId }}</p>
        <p>Emotion: {{ song.emotion }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const runtimeConfig = useRuntimeConfig();
const { gatewayUrl } = runtimeConfig.public;
const songs = ref([]);
const currentPage = ref(0);
const totalPages = ref(1);

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

const user = ref(null);

onAuthStateChanged(auth, (currentUser) => {
  user.value = currentUser;
});

const selectedEmotion = ref("");

const getSongs = async (page = 0) => {
  let data;
  if (user.value) {
    const token = await user.value.getIdToken();
    if (!selectedEmotion.value) {
      data = await getAllSongsAuthenticated(gatewayUrl, token, page);
    }
    else {
      data = await getSongsWithEmotion(gatewayUrl, token, page, selectedEmotion.value);
    }
  }
  else {
    data = await getAllSongs(gatewayUrl, page);
  }
  songs.value = data["content"];
  totalPages.value = data["totalPages"];
};

const nextPage = () => {
  if (currentPage.value + 1 < totalPages.value) {
    currentPage.value++;
    getSongs(currentPage.value);
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    getSongs(currentPage.value);
  }
};

onMounted(() => {
  getSongs(currentPage.value);
});

async function getAllSongs(gatewayUrl, page) {
  const response = await $fetch(`${gatewayUrl}/api/song/allSongs`, {
    method: "GET",
    query: {
      page: page,
    },
  }).catch((error) => {
    console.error("Error getting songs:", error);
  });
  return response;
}

async function getAllSongsAuthenticated(gatewayUrl, token, page) {
  const response = await $fetch(`${gatewayUrl}/api/song/allSongsAuthenticated`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    query: {
      page: page,
    },
  }).catch((error) => {
    console.error("Error getting songs:", error);
  });
  return response;
}

async function getSongsWithEmotion(gatewayUrl, token, page, emotion) {
  const response = await $fetch(`${gatewayUrl}/api/song/songsWithEmotion`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    query: {
      page: page,
      emotion: emotion,
    },
  }).catch((error) => {
    console.error("Error getting songs:", error);
  });
  return response;
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 10px;
}

.page-info {
  margin: 0 10px;
}
</style>
