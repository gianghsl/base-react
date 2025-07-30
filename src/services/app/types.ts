export type ISuccessApi<T> = {
  status: number;
  code: number;
  message: string;
  payload: T;
};

export interface IErrorForm {
  location: string;
  msg: string;
  param: string;
  value: string;
}

export type Theme = "dark" | "light" | "system";
