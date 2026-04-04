<template>
  <div class="counter">
    <h2>Счётчик: {{ count }}</h2>
    <button @click="increment">Увеличить (+1)</button>
    <button @click="decrement">Уменьшить (-1)</button>
  </div>
  <hr />
  <div>
    <h3>Гостевая книга</h3>
    <input v-model="state.newMessage" placeholder="Напишите что-нибудь" />
    <button @click="addMessage">Добавить</button>
    <ul>
      <li v-for="(msg, idx) in state.messages" :key="idx">{{ msg }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// --- Счётчик ---
const count = ref<number>(0);
const increment = (): void => {
  count.value++;
};
const decrement = (): void => {
  count.value--;
};

// --- Гостевая книга ---
const state = reactive({
  messages: [] as string[],
  newMessage: ''
});
const addMessage = (): void => {
  if (state.newMessage.trim()) {
    state.messages.push(state.newMessage);
    state.newMessage = '';
  }
};
</script>

<style scoped>
.counter {
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem;
  border-radius: 8px;
  text-align: center;
}
button {
  margin: 0 0.5rem;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
}
</style>