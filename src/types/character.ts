export { ROLES, type Role } from './constants/roles';
export { SKILLS, type SkillName, type Skills } from './constants/skills';
export { INJURIES_HEAD, INJURIES_BODY, type CriticalInjuryHead, type CriticalInjuryBody } from './constants/injuries';
export { CULTURAL_ORIGINS, type CulturalOrigin, CULTURAL_LANGUAGES } from './constants/cultural';
export {
  PERSONALITIES, CLOTHING_STYLES, HAIR_STYLES, AFFECTATIONS,
  VALUE_MOST, FEEL_ABOUT_PEOPLE, VALUED_PERSONS, VALUED_POSSESSIONS,
  ORIGINAL_BACKGROUNDS, CHILDHOOD_ENVIRONMENTS, FAMILY_CRISIS,
  FRIENDS, ENEMIES, REVENGE, TRAGIC_LOVE, LIFE_GOALS,
  type Personality, type ClothingStyle, type HairStyle, type AffectationYouAreNeverWithout,
} from './constants/lifepath';

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
  lifestile_cost: number;
}