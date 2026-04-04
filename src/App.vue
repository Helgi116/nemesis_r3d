<template>
  <div>
    <nav>
      <router-link to="/">Главная</router-link> |
      <router-link to="/about">О нас</router-link>
    </nav>
    <router-view />   <!-- здесь будет показываться Home или About -->
  </div>
</template>

<script setup lang="ts">
// Никакой дополнительной логики пока не нужно
</script>

<style>
nav {
  margin-bottom: 1rem;
}
router-link {
  margin: 0 0.5rem;
  text-decoration: none;
}
</style>