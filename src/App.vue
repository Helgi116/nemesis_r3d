<template>
  <div class="app-shell">
    <header class="app-header">
      <RouterLink class="brand" to="/">Nemesis // RED</RouterLink>
      <nav class="app-nav" aria-label="Основная навигация">
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/characters">Персонажи</RouterLink>
        <RouterLink to="/character/new" class="nav-cta">Новый</RouterLink>
      </nav>
    </header>
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
}

.app-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1.25rem;
  padding: 0.85rem 1.25rem;
  border-bottom: 1px solid var(--border);
  background: color-mix(in srgb, var(--bg) 88%, var(--accent) 12%);
}

.brand {
  font-weight: 600;
  letter-spacing: 0.04em;
  text-decoration: none;
  color: var(--text-h);
  font-size: 1rem;
}

.brand:hover {
  color: var(--accent);
}

.app-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.75rem;
  align-items: center;
}

.app-nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 0.95rem;
  padding: 0.35rem 0.5rem;
  border-radius: 6px;
}

.app-nav a.router-link-exact-active {
  color: var(--text-h);
  background: var(--accent-bg);
  border: 1px solid var(--accent-border);
}

.nav-cta {
  font-weight: 600;
  color: var(--accent) !important;
}

.app-main {
  flex: 1;
  text-align: left;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
