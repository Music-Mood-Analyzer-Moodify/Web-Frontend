<template>
  <div>
    <h1>Songs</h1>
    <div>
      <div v-for="(song, index) in songs" :key="index" class="song-item">
        <h2>{{ song.name }}</h2>
        <p>Artists: {{ song.artistNames.join(", ") }}</p>
        <p>Spotify ID: {{ song.spotifyId }}</p>
        <p>Randomly selected emotion: {{ song.emotion }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { gatewayUrl } = useRuntimeConfig().public;
const songs = ref([]);
const getMessages = async () => {
  const data = await $fetch(`${gatewayUrl}/api/song/song`, {
    method: "GET",
    query: {
      page: 0,
    },
  }).catch((error) => {
    console.error("Error getting songs:", error);
  });

  for (const item of data["content"]) {
    if (!songs.value.some((song) => song.id === item.id)) {
      songs.value.push(item);
    }
  }
};
onMounted(() => {
  getMessages();
});
</script>
