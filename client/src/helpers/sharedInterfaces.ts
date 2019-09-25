interface TooltipParams {
  timewalkerLevel?: number,
  azeritePower0?: number,
  azeritePower1?: number,
  azeritePower2?: number,
  azeritePower3?: number,
  azeritePowerLevel?: number,
  azeritePower4?: number
}

interface Stat {
  stat?: number,
  amount?: number
}

interface Appearance {
  itemAppearanceModId?: number
}

interface AzeriteItem {
  azeriteLevel?: number,
  azeriteExperience?: number,
  azeriteExperienceRemaining?: number
}

interface AzeritePower {
  id?: number,
  tier?: number,
  spellId?: number,
  bonusListId?: number
}

interface AzeriteEmpoweredItem {
  azeritePowers?: AzeritePower[]
}

export interface Item {
  id?: number,
  name?: string,
  icon?: string,
  quality: number,
  itemLevel?: number,
  tooltipParams?: TooltipParams,
  stats?: Stat[],
  armor?: number,
  context?: string,
  bonusLists?: number[],
  artifactId?: number,
  displayInfoId?: number,
  artifactAppearanceId?: number,
  artifactTraits?: any[],
  relics?: any[],
  appearance?: Appearance,
  azeriteItem?: AzeriteItem,
  azeriteEmpoweredItem?: AzeriteEmpoweredItem
}

export interface Items {
  averageItemLevel?: number,
  averageItemLevelEquipped?: number,
  head: Item,
  neck: Item,
  shoulder: Item,
  back: Item,
  chest: Item,
  shirt: Item,
  tabard: Item,
  wrist: Item,
  hands: Item,
  waist: Item,
  legs: Item,
  feet: Item,
  finger1: Item,
  finger2: Item,
  trinket1: Item,
  trinket2: Item,
  mainHand: Item
  offHand: Item
}

interface SpecDetails {
  name: string,
  role: string,
  backgroundImage: string,
  icon: string,
  description: string,
  order: number
}

interface Spec {
  selected?: boolean,
  talents: any[],
  spec: SpecDetails,
  calcTalent: string,
  calcSpec: string
}

export interface Profile {
  lastModified?: number,
  name: string,
  realm?: string,
  battlegroup?: string,
  class: number,
  race: number,
  gender?: number,
  level?: number,
  achievementPoints?: number,
  thumbnail?: string,
  calcClass?: string,
  faction: number,
  items: Items,
  talents: Spec[],
  totalHonorableKills?: number
}

export interface WowRepository {
  getProfile: (realm: string, characterName: string) => Promise<Profile>;
}

export interface HeroIdentifier {
  realm: string;
  characterName: string;
  key: string;
}