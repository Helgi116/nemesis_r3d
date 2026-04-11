<template>
  <section class="page home">
    <p class="eyebrow">Cyberpunk RED · ассистент за столом</p>
    <h1>Nemesis // RED</h1>
    <p class="lead">
      Создавайте листы персонажей, храните их в браузере и ведите библиотеку команды или NPC. Данные
      остаются на вашем устройстве (localStorage).
    </p>
    <div class="actions">
      <RouterLink class="btn primary" to="/character/new">Создать персонажа</RouterLink>
      <RouterLink class="btn ghost" to="/characters">Библиотека</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.home {
  max-width: 40rem;
  margin: 0 auto;
  padding: 2rem 1.25rem 3rem;
}

.eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 0.5rem;
}

.lead {
  text-align: left;
  line-height: 1.55;
  margin: 0 0 1.75rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}
</style>
