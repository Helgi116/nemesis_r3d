import type { CriticalInjuryBody, CriticalInjuryHead } from './constants/injuries';
import type {
  AffectationYouAreNeverWithout,
  ClothingStyle,
  HairStyle,
  Personality,
} from './constants/lifepath';
import { PERSONALITIES, CLOTHING_STYLES, HAIR_STYLES, AFFECTATIONS } from './constants/lifepath';
import { ROLES, type Role } from './constants/roles';
import { SKILLS, type Skills } from './constants/skills';

export { ROLES, type Role } from './constants/roles';
export { SKILLS, type SkillName, type Skills } from './constants/skills';
export { INJURIES_HEAD, INJURIES_BODY, type CriticalInjuryHead, type CriticalInjuryBody } from './constants/injuries';
export { CULTURAL_ORIGINS, type CulturalOrigin, CULTURAL_LANGUAGES } from './constants/lifepath';
export {
  PERSONALITIES, CLOTHING_STYLES, HAIR_STYLES, AFFECTATIONS,
  VALUE_MOST, FEEL_ABOUT_PEOPLE, VALUED_PERSONS, VALUED_POSSESSIONS,
  ORIGINAL_BACKGROUNDS, CHILDHOOD_ENVIRONMENTS, FAMILY_CRISIS,
  FRIENDS, ENEMIES, REVENGE, TRAGIC_LOVE, LIFE_GOALS,
  type Personality, 
  type ClothingStyle, 
  type HairStyle, 
  type AffectationYouAreNeverWithout,
} from './constants/lifepath';

export interface Character {
  id: number;
  handle: string;
  role: Role;
  role_ability_rank: number;
  notes: string;
  intelligence: number;
  willpower: number;
  cool: number;
  empathy_current: number;
  empathy_max: number;
  technique: number;
  reflexes: number;
  luck_current: number;
  luck_max: number;
  body: number;
  dexterity: number;
  movement_current: number;
  movement_max: number;
  humanity_current: number;
  humanity_max: number;
  hit_points_current: number;
  hit_points_max: number;
  seriously_wounded: boolean;
  critical_injuries_head: CriticalInjuryHead[];
  critical_injuries_body: CriticalInjuryBody[];
  addictions: string;
  death_save: number;
  equipped_weapon: number;
  equipped_head_armor: number;
  equipped_body_armor: number;
  equipped_shield: number;
  aliases: string;
  improvement_points_current: number;
  improvement_points_max: number;
  reputation: number;
  reputation_events: string;
  lifepath: Lifepath;
  cash: number;
  housing: string;
  rent: number;
  lifestyle_cost: number;
  skills: Skills;
}

export interface Lifepath {
  cultural_origins: string;
  personality: Personality;
  clothing_style: ClothingStyle;
  hairstyle: HairStyle;
  affection_you_are_never_without: AffectationYouAreNeverWithout;
  what_do_you_value_most: string;
  feelings_about_people: string;
  most_valued_person: string;
  most_valued_possesion: string;
  family_background: string;
  childhood_environment: string;
  family_crisis: string;
  life_goals: string;
  friends: string[];
  tragic_love_affairs: string[];
  enemies: string[];
}

export function createEmptyLifepath(): Lifepath {
  return {
    cultural_origins: '',
    personality: PERSONALITIES[0],
    clothing_style: CLOTHING_STYLES[0],
    hairstyle: HAIR_STYLES[0],
    affection_you_are_never_without: AFFECTATIONS[0],
    what_do_you_value_most: '',
    feelings_about_people: '',
    most_valued_person: '',
    most_valued_possesion: '',
    family_background: '',
    childhood_environment: '',
    family_crisis: '',
    life_goals: '',
    friends: [],
    tragic_love_affairs: [],
    enemies: []
  };
}

export function createEmptySkills(): Skills {
  const skills = {} as Skills;
  for (const skill of SKILLS) {
    skills[skill.value] = 0;
  }
  return skills;
}

export function createEmptyCharacter(): Character {
  const now = Date.now();
  return {
    id: now,
    handle: '',
    role: ROLES[0].value,
    role_ability_rank: 1,
    notes: '',
    intelligence: 0,
    willpower: 0,
    cool: 0,
    empathy_current: 0,
    empathy_max: 0,
    technique: 0,
    reflexes: 0,
    luck_current: 0,
    luck_max: 0,
    body: 0,
    dexterity: 0,
    movement_current: 0,
    movement_max: 0,
    humanity_current: 0,
    humanity_max: 0,
    hit_points_current: 0,
    hit_points_max: 0,
    seriously_wounded: false,
    critical_injuries_head: [],
    critical_injuries_body: [],
    addictions: '',
    death_save: 0,
    equipped_weapon: 0,
    equipped_head_armor: 0,
    equipped_body_armor: 0,
    equipped_shield: 0,
    aliases: '',
    improvement_points_current: 0,
    improvement_points_max: 0,
    reputation: 0,
    reputation_events: '',
    lifepath: createEmptyLifepath(),
    cash: 0,
    housing: '',
    rent: 0,
    lifestyle_cost: 0,
    skills: createEmptySkills(),
  };
}