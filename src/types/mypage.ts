export type UserProfile = {
  nickname: string;
  level: number;
  imageUrl: string;
};

export type UserLogsList = UserLogsListType[];

export type UserLogsListType = {
  logId: string;
  imageUrl: string;
};
