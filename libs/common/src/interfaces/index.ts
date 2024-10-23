export * from './session-payload.interface'

export interface IProfile {
  username: string;
  photo_url: string;
  telegramId: number;
  companyName: string;
  languageCode: string;
}

export interface IBalance {
  current: number;
  total: number;
}

export interface IStats {
  level: number;
  maxEnergy: number;
  totalTaps: number;
  incomePerTap: number;
  incomePerHour: number;
  currentEnergy: number;
  energyPerSecond: number;
}

export interface IBoost {
  fullEnergy: number;
  fullEnergyUsed: number;
  lastFullEnergyUsedDate: Date;

  turbo: number;
  turboUsed: number;
  lastTurboUsedDate: Date;

  multitapLevel: number;
  energyLimitLevel: number;
}

export interface ICharacter {
  characterId: number;
  name: string;
}

export interface ILoginOptionsState {
  lastSyncTime: Date;
  logoutTime: Date;
  lastTapDate: Date;
  tapsCount: number;
}
