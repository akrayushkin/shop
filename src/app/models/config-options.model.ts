export enum Sex {
  male = 'Male',
  female = 'Female',
  other = 'Other'
}

export interface ConfigModel {
  readonly id?: number;
  readonly login: string;
  readonly email: string;
  readonly phoneNumber?: number;
  readonly name?: string;
  readonly sex?: Sex;
  readonly birthdate?: Date;
}
