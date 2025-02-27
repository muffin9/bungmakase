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

export type UserLogs = {
  bungCount: number;
  bungName: string;
  date: string;
  imageUrls: string[];
  logId: string;
  tags: string[];
};
