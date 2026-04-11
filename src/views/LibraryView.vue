<template>
  <section class="page library">
    <header class="library-head">
      <div>
        <h1>Библиотека</h1>
        <p class="sub">Всего: {{ characters.length }}</p>
      </div>
      <RouterLink class="btn primary" to="/character/new">Новый персонаж</RouterLink>
    </header>

    <label class="search">
      <span class="sr-only">Поиск по кличке или роли</span>
      <input
        v-model="query"
        type="search"
        placeholder="Поиск по кличке, алиасам, заметкам…"
        autocomplete="off"
      />
    </label>

    <p v-if="filtered.length === 0" class="empty">Никого не нашли. Создайте первого персонажа.</p>

    <ul v-else class="cards">
      <li v-for="c in filtered" :key="c.id" class="card">
        <RouterLink class="card-link" :to="{ name: 'editor', params: { id: String(c.id) } }">
          <span class="handle">{{ c.handle || 'Без клички' }}</span>
          <span class="role">{{ roleLabel(c.role) }}</span>
          <span v-if="c.aliases" class="aliases">{{ c.aliases }}</span>
        </RouterLink>
        <button
          type="button"
          class="btn danger ghost icon"
          title="Удалить"
          @click.prevent="confirmRemove(c)"
        >
          Удалить
        </button>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCharacters } from '../stores/characters';
import { ROLES } from '../types/character';
import type { Character } from '../types/character';

const { characters, sortedCharacters, remove } = useCharacters();
const query = ref('');

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return sortedCharacters.value;
  return sortedCharacters.value.filter((c) => matches(c, q));
});

function roleLabel(role: Character['role']) {
  return ROLES.find((r) => r.value === role)?.label ?? role;
}

function matches(c: Character, q: string) {
  const hay = [
    c.handle,
    c.aliases,
    c.notes,
    roleLabel(c.role),
    c.lifepath.cultural_origins,
    c.lifepath.life_goals,
  ]
    .join('\n')
    .toLowerCase();
  return hay.includes(q);
}

function confirmRemove(c: Character) {
  const name = c.handle || `id ${c.id}`;
  if (!window.confirm(`Удалить персонажа «${name}»? Это нельзя отменить.`)) return;
  remove(c.id);
}
</script>

<style scoped>
.library {
  padding: 1.5rem 1.25rem 3rem;
  text-align: left;
}

.library-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.sub {
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
  color: var(--text);
}

.search input {
  width: 100%;
  max-width: 28rem;
  box-sizing: border-box;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text-h);
  font: inherit;
  margin-bottom: 1.5rem;
}

.empty {
  margin: 2rem 0;
  text-align: center;
  color: var(--text);
}

.cards {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.card {
  display: flex;
  align-items: stretch;
  gap: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  background: color-mix(in srgb, var(--bg) 92%, var(--accent) 8%);
}

.card-link {
  flex: 1;
  padding: 1rem 1rem 0.85rem;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.handle {
  font-weight: 600;
  color: var(--text-h);
  font-size: 1.05rem;
}

.role {
  font-size: 0.85rem;
  color: var(--accent);
}

.aliases {
  font-size: 0.8rem;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.icon {
  align-self: center;
  margin-right: 0.5rem;
}
</style>
