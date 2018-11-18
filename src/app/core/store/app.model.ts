export const appStoreName = 'mediaStore';
export interface AppModel {
  version: string;
}

export enum RequestStatus {
  NOT_DONE,
  IN_PROGRESS,
  SUCCESS,
  ERROR
}
