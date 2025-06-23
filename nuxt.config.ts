export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      gatewayUrl: process.env.NUXT_PUBLIC_GATEWAY_URL,
      apiKey: "AIzaSyCFtnq5pflWqMnfoSjLIq04M1sUQgpsDTI",
      authDomain: "moodify-web-frontend.firebaseapp.com",
      projectId: "moodify-web-frontend",
      storageBucket: "moodify-web-frontend.firebasestorage.app",
      messagingSenderId: "106664090264",
      appId: "1:106664090264:web:4afe8050770725ae978eed",
      measurementId: "G-0XX6R3PFGC",
    },
  },
});
