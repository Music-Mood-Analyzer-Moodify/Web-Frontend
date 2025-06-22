<template>
  <div>
    <header>
      <h1>Moodify</h1>
      <nav>
        <NuxtLink to="/">Home</NuxtLink> |
        <NuxtLink to="/songs">Songs</NuxtLink>
      </nav>
    </header>
    <NuxtLayout />
    <br />
    <NuxtPage />
    <footer>
      <p>© 2025 Moodify</p>
    </footer>
  </div>
</template>

<style>
@import "./assets/main.css";
</style>