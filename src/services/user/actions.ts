import axios from "@/lib/axios";

import { UserEndPoints } from "./constants";
import { useUserStores } from "./stores";
import { IUserResponse } from "./types";

export const UserActions = {
  setState: useUserStores.setState,
  getState: useUserStores.getState,

  GetMe: async () => {
    const r = await axios.get<IUserResponse>(UserEndPoints.GetMe);
    return r.data;
  },

  Logout: () => {
    UserActions.setState({ user: null });
  },
};
