export enum APP_SCREEN {
  LOGIN = 'Login',
  CREATE_ACC = 'CREATE_ACC',
  HOME = 'Home',
  ARTICLE_DETAILS = 'ARTICLE_DETAILS',
}

export type RootStackParamList = {
  [APP_SCREEN.LOGIN]: undefined;
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.ARTICLE_DETAILS]: {
    articleIndex: number; // this should be id of item, but as response isnt giving any id so we are going with index
  };
};

export enum APIStatus {
  IDLE,
  PENDING,
  REJECTED,
  FULFILLED,
}

export type APIError = {
  message: string;
  code: number;
};

export type APIResponse<DataType = any> = {
  status: APIStatus;
  error?: APIError;
  data?: DataType;
};