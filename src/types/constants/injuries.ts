export const INJURIES_HEAD = [
  'lost_eye',
  'brain_injury',
  'damaged_eye',
  'concussion',
  'broken_jaw',
  'foreign_object',
  'whiplash',
  'cracked_skull',
  'damaged_ear',
  'crushed_windpipe',
  'lost_ear'
] as const;

export const INJURIES_BODY = [
  'dismembered_arm',
  'dismembered_hand',
  'collapsed_lung',
  'broken_ribs',
  'broken_arm',
  'foreign_object',
  'broken_leg',
  'torn_muscle',
  'spinal_injury',
  'crushed_fingers',
  'dismembered_leg'
] as const;

export type CriticalInjuryHead = typeof INJURIES_HEAD[number];
export type CriticalInjuryBody = typeof INJURIES_BODY[number];