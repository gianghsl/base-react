import type { ISuccessApi } from "../app/types";

export type IUserResponse = ISuccessApi<IUser>;

export type IUser = {
  _id: string;
  name: string;
};
