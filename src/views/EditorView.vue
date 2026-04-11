<template>
  <div v-if="missing" class="page editor">
    <p>Персонаж не найден.</p>
    <RouterLink class="btn ghost" to="/characters">К библиотеке</RouterLink>
  </div>

  <form v-else class="page editor" @submit.prevent="onSave">
    <header class="editor-head">
      <div>
        <p class="eyebrow">{{ isNew ? 'Новый лист' : 'Редактирование' }}</p>
        <h1>{{ draft.handle || 'Без клички' }}</h1>
      </div>
      <div class="head-actions">
        <button type="submit" class="btn primary">Сохранить</button>
        <RouterLink v-if="!isNew" class="btn ghost" to="/characters">Назад</RouterLink>
        <button
          v-if="!isNew"
          type="button"
          class="btn danger ghost"
          @click="onDelete"
        >
          Удалить
        </button>
      </div>
    </header>

    <section class="panel">
      <h2>Основное</h2>
      <div class="grid two">
        <label class="field">
          <span>Кличка</span>
          <input v-model="draft.handle" type="text" autocomplete="nickname" />
        </label>
        <label class="field">
          <span>Роль</span>
          <select v-model="draft.role">
            <option v-for="r in ROLES" :key="r.value" :value="r.value">{{ r.label }}</option>
          </select>
        </label>
        <label class="field">
          <span>Ранг ролевой способности</span>
          <input v-model.number="draft.role_ability_rank" type="number" min="1" max="10" />
        </label>
        <label class="field">
          <span>Алиасы</span>
          <input v-model="draft.aliases" type="text" />
        </label>
      </div>
      <p class="role-hint">{{ currentRole?.role_description }}</p>
      <label class="field block">
        <span>Заметки</span>
        <textarea v-model="draft.notes" rows="3" />
      </label>
    </section>

    <section class="panel">
      <h2>Характеристики</h2>
      <div class="grid stats">
        <label v-for="s in scalarStats" :key="s.key" class="field">
          <span>{{ s.label }}</span>
          <input v-model.number="draft[s.key]" type="number" min="0" max="12" step="1" />
        </label>
      </div>
      <div class="grid two">
        <label class="field">
          <span>Эмпатия (текущая / макс.)</span>
          <div class="pair">
            <input v-model.number="draft.empathy_current" type="number" min="0" max="20" />
            <input v-model.number="draft.empathy_max" type="number" min="0" max="20" />
          </div>
        </label>
        <label class="field">
          <span>Удача (текущая / макс.)</span>
          <div class="pair">
            <input v-model.number="draft.luck_current" type="number" min="0" max="20" />
            <input v-model.number="draft.luck_max" type="number" min="0" max="20" />
          </div>
        </label>
        <label class="field">
          <span>Движение (текущее / макс.)</span>
          <div class="pair">
            <input v-model.number="draft.movement_current" type="number" min="0" max="20" />
            <input v-model.number="draft.movement_max" type="number" min="0" max="20" />
          </div>
        </label>
        <label class="field">
          <span>Человечность (текущая / макс.)</span>
          <div class="pair">
            <input v-model.number="draft.humanity_current" type="number" min="0" max="100" />
            <input v-model.number="draft.humanity_max" type="number" min="0" max="100" />
          </div>
        </label>
        <label class="field">
          <span>Хиты (текущие / макс.)</span>
          <div class="pair">
            <input v-model.number="draft.hit_points_current" type="number" min="0" max="999" />
            <input v-model.number="draft.hit_points_max" type="number" min="0" max="999" />
          </div>
        </label>
        <label class="field">
          <span>Очки улучшения (текущие / макс.)</span>
          <div class="pair">
            <input v-model.number="draft.improvement_points_current" type="number" min="0" max="999" />
            <input v-model.number="draft.improvement_points_max" type="number" min="0" max="999" />
          </div>
        </label>
      </div>
      <label class="check">
        <input v-model="draft.seriously_wounded" type="checkbox" />
        Тяжело ранен
      </label>
    </section>

    <section class="panel">
      <h2>Состояние и мета</h2>
      <div class="grid three">
        <label class="field">
          <span>Спасбросок от смерти</span>
          <input v-model.number="draft.death_save" type="number" min="0" max="10" />
        </label>
        <label class="field">
          <span>Репутация</span>
          <input v-model.number="draft.reputation" type="number" min="-999" max="999" />
        </label>
        <label class="field">
          <span>Кэш (€$)</span>
          <input v-model.number="draft.cash" type="number" min="0" step="1" />
        </label>
        <label class="field">
          <span>Жильё</span>
          <input v-model="draft.housing" type="text" />
        </label>
        <label class="field">
          <span>Аренда (€$/мес)</span>
          <input v-model.number="draft.rent" type="number" min="0" />
        </label>
        <label class="field">
          <span>Стоимость образа жизни</span>
          <input v-model.number="draft.lifestyle_cost" type="number" min="0" />
        </label>
      </div>
      <label class="field block">
        <span>События репутации</span>
        <textarea v-model="draft.reputation_events" rows="2" />
      </label>
      <label class="field block">
        <span>Зависимости</span>
        <textarea v-model="draft.addictions" rows="2" />
      </label>
    </section>

    <section class="panel">
      <h2>Лайфпат</h2>
      <div class="grid two">
        <label class="field">
          <span>Культурное происхождение</span>
          <select v-model="draft.lifepath.cultural_origins">
            <option value="">— не выбрано —</option>
            <option v-for="o in CULTURAL_ORIGINS" :key="o" :value="o">{{ o }}</option>
          </select>
        </label>
        <label class="field">
          <span>Личность</span>
          <select v-model="draft.lifepath.personality">
            <option v-for="p in PERSONALITIES" :key="p" :value="p">{{ p }}</option>
          </select>
        </label>
        <label class="field">
          <span>Стиль одежды</span>
          <select v-model="draft.lifepath.clothing_style">
            <option v-for="x in CLOTHING_STYLES" :key="x" :value="x">{{ x }}</option>
          </select>
        </label>
        <label class="field">
          <span>Причёска</span>
          <select v-model="draft.lifepath.hairstyle">
            <option v-for="x in HAIR_STYLES" :key="x" :value="x">{{ x }}</option>
          </select>
        </label>
        <label class="field">
          <span>Аксессуар, без которого не выходишь</span>
          <select v-model="draft.lifepath.affection_you_are_never_without">
            <option v-for="x in AFFECTATIONS" :key="x" :value="x">{{ x }}</option>
          </select>
        </label>
        <label class="field">
          <span>Что ценишь больше всего</span>
          <select v-model="draft.lifepath.what_do_you_value_most">
            <option value="">— текст или выбор —</option>
            <option v-for="x in VALUE_MOST" :key="x" :value="x">{{ x }}</option>
          </select>
        </label>
        <label class="field">
          <span>Отношение к людям</span>
          <select v-model="draft.lifepath.feelings_about_people">
            <option value="">— не выбрано —</option>
            <option v-for="x in FEEL_ABOUT_PEOPLE" :key="x" :value="x">{{ x }}</option>
          </select>
        </label>
        <label class="field">
          <span>Самый ценный человек</span>
          <select v-model="draft.lifepath.most_valued_person">
            <option value="">— не выбрано —</option>
            <option v-for="x in VALUED_PERSONS" :key="x" :value="x">{{ x }}</option>
          </select>
        </label>
        <label class="field">
          <span>Самая ценная вещь</span>
          <select v-model="draft.lifepath.most_valued_possesion">
            <option value="">— не выбрано —</option>
            <option v-for="x in VALUED_POSSESSIONS" :key="x" :value="x">{{ x }}</option>
          </select>
        </label>
        <label class="field block">
          <span>Семья (происхождение)</span>
          <textarea v-model="draft.lifepath.family_background" rows="3" />
        </label>
        <label class="field">
          <span>Детская среда</span>
          <select v-model="draft.lifepath.childhood_environment">
            <option value="">— не выбрано —</option>
            <option v-for="x in CHILDHOOD_ENVIRONMENTS" :key="x" :value="x">{{ x }}</option>
          </select>
        </label>
        <label class="field">
          <span>Семейный кризис</span>
          <select v-model="draft.lifepath.family_crisis">
            <option value="">— не выбрано —</option>
            <option v-for="x in FAMILY_CRISIS" :key="x" :value="x">{{ x }}</option>
          </select>
        </label>
        <label class="field block">
          <span>Жизненные цели</span>
          <textarea v-model="draft.lifepath.life_goals" rows="2" />
        </label>
      </div>

      <div class="list-block">
        <div class="list-head">
          <h3>Друзья</h3>
          <button type="button" class="btn tiny ghost" @click="pushLine(draft.lifepath.friends)">+ строка</button>
        </div>
        <ul class="string-list">
          <li v-for="(_item, i) in draft.lifepath.friends" :key="'f' + i">
            <input v-model="draft.lifepath.friends[i]" type="text" />
            <button type="button" class="btn tiny danger ghost" @click="removeAt(draft.lifepath.friends, i)">×</button>
          </li>
        </ul>
      </div>

      <div class="list-block">
        <div class="list-head">
          <h3>Враги</h3>
          <button type="button" class="btn tiny ghost" @click="pushLine(draft.lifepath.enemies)">+ строка</button>
        </div>
        <ul class="string-list">
          <li v-for="(_item, i) in draft.lifepath.enemies" :key="'e' + i">
            <input v-model="draft.lifepath.enemies[i]" type="text" />
            <button type="button" class="btn tiny danger ghost" @click="removeAt(draft.lifepath.enemies, i)">×</button>
          </li>
        </ul>
      </div>

      <div class="list-block">
        <div class="list-head">
          <h3>Трагические романы</h3>
          <button type="button" class="btn tiny ghost" @click="pushLine(draft.lifepath.tragic_love_affairs)">
            + строка
          </button>
        </div>
        <ul class="string-list">
          <li v-for="(_item, i) in draft.lifepath.tragic_love_affairs" :key="'t' + i">
            <input v-model="draft.lifepath.tragic_love_affairs[i]" type="text" />
            <button
              type="button"
              class="btn tiny danger ghost"
              @click="removeAt(draft.lifepath.tragic_love_affairs, i)"
            >
              ×
            </button>
          </li>
        </ul>
      </div>
    </section>

    <section class="panel">
      <h2>Навыки</h2>
      <p class="muted">Значения — ранг навыка (0…10). «Сложные» навыки отмечены в книге правил.</p>
      <details v-for="[label, rows] in skillsByCategory" :key="label" class="skill-group">
        <summary>{{ label }}</summary>
        <div class="skills-grid">
          <label v-for="row in rows" :key="row.value" class="skill">
            <span class="skill-name" :title="row.description">
              {{ row.label }}
              <span v-if="row.harder === 'true'" class="tag">сложный</span>
            </span>
            <input
              v-model.number="draft.skills[row.value]"
              type="number"
              min="0"
              max="10"
              step="1"
            />
          </label>
        </div>
      </details>
    </section>

    <footer class="editor-foot">
      <button type="submit" class="btn primary">Сохранить</button>
      <RouterLink class="btn ghost" to="/characters">К библиотеке</RouterLink>
    </footer>
  </form>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCharacters } from '../stores/characters';
import type { Character } from '../types/character';
import {
  AFFECTATIONS,
  CHILDHOOD_ENVIRONMENTS,
  CLOTHING_STYLES,
  CULTURAL_ORIGINS,
  createEmptyCharacter,
  FAMILY_CRISIS,
  FEEL_ABOUT_PEOPLE,
  HAIR_STYLES,
  PERSONALITIES,
  ROLES,
  SKILLS,
  VALUE_MOST,
  VALUED_PERSONS,
  VALUED_POSSESSIONS,
} from '../types/character';

const props = defineProps<{ id: string }>();
const route = useRoute();
const router = useRouter();
const { getById, upsert, remove } = useCharacters();

const resolvedId = computed(() => props.id || String(route.params.id || ''));

const isNew = computed(() => resolvedId.value === 'new');
const missing = ref(false);
const draft = ref<Character>(createEmptyCharacter());

const currentRole = computed(() => ROLES.find((r) => r.value === draft.value.role));

const scalarStats = [
  { key: 'intelligence' as const, label: 'Интеллект (INT)' },
  { key: 'willpower' as const, label: 'Воля (WILL)' },
  { key: 'reflexes' as const, label: 'Реакция (REF)' },
  { key: 'dexterity' as const, label: 'Ловкость (DEX)' },
  { key: 'technique' as const, label: 'Техника (TECH)' },
  { key: 'cool' as const, label: 'Хладнокровие (COOL)' },
  { key: 'body' as const, label: 'Телосложение (BODY)' },
];

const skillsByCategory = computed(() => {
  const order: string[] = [];
  const buckets = new Map<string, (typeof SKILLS)[number][]>();
  for (const row of SKILLS) {
    if (!buckets.has(row.category_label)) {
      buckets.set(row.category_label, []);
      order.push(row.category_label);
    }
    buckets.get(row.category_label)!.push(row);
  }
  return order.map((label) => [label, buckets.get(label)!] as const);
});

function loadDraft() {
  missing.value = false;
  const rid = resolvedId.value;
  if (rid === 'new' || rid === '') {
    draft.value = createEmptyCharacter();
    return;
  }
  const num = Number(rid);
  if (!Number.isFinite(num)) {
    missing.value = true;
    return;
  }
  const existing = getById(num);
  if (!existing) {
    missing.value = true;
    return;
  }
  draft.value = structuredClone(existing);
}

watch(resolvedId, loadDraft, { immediate: true });

function onSave() {
  const snapshot = structuredClone(draft.value);
  upsert(snapshot);
  draft.value = snapshot;
  if (isNew.value) {
    router.replace({ name: 'editor', params: { id: String(snapshot.id) } });
  }
}

function onDelete() {
  const id = draft.value.id;
  const name = draft.value.handle || `id ${id}`;
  if (!window.confirm(`Удалить «${name}»?`)) return;
  remove(id);
  router.push({ name: 'library' });
}

function pushLine(arr: string[]) {
  arr.push('');
}

function removeAt(arr: string[], index: number) {
  arr.splice(index, 1);
}
</script>

<style scoped>
.editor {
  padding: 1.25rem 1.25rem 3rem;
  text-align: left;
}

.editor-head,
.editor-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.head-actions,
.editor-foot {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.editor-foot {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 0.35rem;
}

.role-hint {
  margin: 0.5rem 0 1rem;
  font-size: 0.9rem;
  line-height: 1.45;
  color: var(--text);
}

.panel {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1rem 1.1rem 1.25rem;
  margin-bottom: 1rem;
  background: color-mix(in srgb, var(--bg) 94%, var(--accent) 6%);
}

.panel h2 {
  margin-top: 0;
}

.grid {
  display: grid;
  gap: 0.75rem 1rem;
}

.grid.two {
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
}

.grid.three {
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
}

.grid.stats {
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.85rem;
  color: var(--text-h);
}

.field.block {
  margin-top: 0.5rem;
}

.field span {
  color: var(--text);
}

input,
select,
textarea {
  font: inherit;
  color: var(--text-h);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.45rem 0.55rem;
}

textarea {
  resize: vertical;
  min-height: 4.5rem;
}

.pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.check {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: var(--text-h);
}

.list-block {
  margin-top: 1rem;
}

.list-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.list-head h3 {
  margin: 0;
  font-size: 1rem;
}

.string-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.string-list li {
  display: flex;
  gap: 0.35rem;
}

.string-list input {
  flex: 1;
}

.muted {
  margin: 0 0 0.75rem;
  font-size: 0.85rem;
  color: var(--text);
}

.skill-group {
  margin: 0.5rem 0 0.75rem;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.35rem 0.65rem 0.65rem;
  background: var(--bg);
}

.skill-group summary {
  cursor: pointer;
  font-weight: 600;
  color: var(--text-h);
  padding: 0.35rem 0;
}

.skills-grid {
  display: grid;
  gap: 0.5rem 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}

.skill {
  display: grid;
  grid-template-columns: 1fr 4.5rem;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.8rem;
}

.skill-name {
  color: var(--text-h);
  line-height: 1.25;
}

.tag {
  display: inline-block;
  margin-left: 0.35rem;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--accent);
  vertical-align: middle;
}

.skill input {
  width: 100%;
  box-sizing: border-box;
}
</style>
