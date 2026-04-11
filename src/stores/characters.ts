import { computed, ref, watch } from 'vue';
import type { Character } from '../types/character';
import {
  createEmptyCharacter,
  createEmptyLifepath,
  createEmptySkills,
} from '../types/character';
import type { Skills } from '../types/character';

const STORAGE_KEY = 'nemesis_r3d_characters_v1';

function mergeSkills(partial: unknown): Skills {
  const base = createEmptySkills();
  if (!partial || typeof partial !== 'object') return base;
  const o = partial as Record<string, unknown>;
  for (const key of Object.keys(base) as (keyof Skills)[]) {
    const v = o[key as string];
    base[key] = typeof v === 'number' && Number.isFinite(v) ? Math.max(0, Math.floor(v)) : 0;
  }
  return base;
}

function normalizeCharacter(raw: unknown): Character | null {
  if (!raw || typeof raw !== 'object') return null;
  const c = raw as Record<string, unknown>;
  const id = typeof c.id === 'number' && Number.isFinite(c.id) ? c.id : Number(c.id);
  if (!Number.isFinite(id)) return null;

  const base = createEmptyCharacter();
  const legacyLifestyle =
    typeof c.lifestile_cost === 'number' && Number.isFinite(c.lifestile_cost)
      ? c.lifestile_cost
      : undefined;
  const lifestyle =
    typeof c.lifestyle_cost === 'number' && Number.isFinite(c.lifestyle_cost)
      ? c.lifestyle_cost
      : legacyLifestyle ?? base.lifestyle_cost;

  const lp = (c.lifepath && typeof c.lifepath === 'object' ? c.lifepath : {}) as Record<
    string,
    unknown
  >;
  const emptyLp = createEmptyLifepath();

  const asStrArr = (v: unknown): string[] =>
    Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];

  const lifepath = {
    ...emptyLp,
    cultural_origins: typeof lp.cultural_origins === 'string' ? lp.cultural_origins : emptyLp.cultural_origins,
    personality: (lp.personality ?? emptyLp.personality) as (typeof emptyLp)['personality'],
    clothing_style: (lp.clothing_style ?? emptyLp.clothing_style) as (typeof emptyLp)['clothing_style'],
    hairstyle: (lp.hairstyle ?? emptyLp.hairstyle) as (typeof emptyLp)['hairstyle'],
    affection_you_are_never_without: (lp.affection_you_are_never_without ??
      emptyLp.affection_you_are_never_without) as (typeof emptyLp)['affection_you_are_never_without'],
    what_do_you_value_most:
      typeof lp.what_do_you_value_most === 'string' ? lp.what_do_you_value_most : emptyLp.what_do_you_value_most,
    feelings_about_people:
      typeof lp.feelings_about_people === 'string' ? lp.feelings_about_people : emptyLp.feelings_about_people,
    most_valued_person:
      typeof lp.most_valued_person === 'string' ? lp.most_valued_person : emptyLp.most_valued_person,
    most_valued_possesion:
      typeof lp.most_valued_possesion === 'string' ? lp.most_valued_possesion : emptyLp.most_valued_possesion,
    family_background:
      typeof lp.family_background === 'string' ? lp.family_background : emptyLp.family_background,
    childhood_environment:
      typeof lp.childhood_environment === 'string'
        ? lp.childhood_environment
        : emptyLp.childhood_environment,
    family_crisis: typeof lp.family_crisis === 'string' ? lp.family_crisis : emptyLp.family_crisis,
    life_goals: typeof lp.life_goals === 'string' ? lp.life_goals : emptyLp.life_goals,
    friends: asStrArr(lp.friends),
    tragic_love_affairs: asStrArr(lp.tragic_love_affairs),
    enemies: asStrArr(lp.enemies),
  };

  const role = typeof c.role === 'string' ? (c.role as Character['role']) : base.role;

  const merged: Character = {
    ...base,
    ...c,
    id,
    role,
    lifestyle_cost: lifestyle,
    lifepath,
    skills: mergeSkills(c.skills),
    critical_injuries_head: Array.isArray(c.critical_injuries_head)
      ? (c.critical_injuries_head as Character['critical_injuries_head'])
      : base.critical_injuries_head,
    critical_injuries_body: Array.isArray(c.critical_injuries_body)
      ? (c.critical_injuries_body as Character['critical_injuries_body'])
      : base.critical_injuries_body,
  };
  delete (merged as unknown as Record<string, unknown>).lifestile_cost;
  return merged;
}

function loadAll(): Character[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeCharacter).filter((x): x is Character => x !== null);
  } catch {
    return [];
  }
}

function saveAll(list: Character[]) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

const characters = ref<Character[]>(loadAll());

watch(
  characters,
  (v) => {
    saveAll(v);
  },
  { deep: true },
);

export function useCharacters() {
  const sorted = computed(() =>
    [...characters.value].sort((a, b) => String(a.handle).localeCompare(String(b.handle), 'ru')),
  );

  function getById(id: number): Character | undefined {
    return characters.value.find((c) => c.id === id);
  }

  function upsert(character: Character) {
    const idx = characters.value.findIndex((c) => c.id === character.id);
    if (idx === -1) {
      characters.value = [...characters.value, character];
    } else {
      const next = [...characters.value];
      next[idx] = character;
      characters.value = next;
    }
  }

  function remove(id: number) {
    characters.value = characters.value.filter((c) => c.id !== id);
  }

  return {
    characters,
    sortedCharacters: sorted,
    getById,
    upsert,
    remove,
  };
}
