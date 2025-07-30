import { setAxiosToken } from "@/lib/axios";

import { UserActions } from "../user/actions";

import { AppActions } from "./actions";

export const Logout = () => {
  setAxiosToken("");

  AppActions.logout();
  UserActions.Logout();
};
