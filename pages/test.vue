<template>
    <h1>Test Page</h1>
    <div>
    <p>This is a test page to verify the functionality of the application.</p>
    <button @click="testFunction">Click Me!</button>
    </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
console.log("test!");
</script>