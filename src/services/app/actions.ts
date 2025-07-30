import queryString from "query-string";

import {
  AccessToken,
  PrivateToken,
  ReferralCode,
  ReferralCodeQuery,
} from "./constants";
import { useAppStore } from "./stores";

export const AppActions = {
  setState: useAppStore.setState,
  getState: useAppStore.getState,

  // Access Token
  setAccessToken: (token: string = "") =>
    localStorage.setItem(AccessToken, token),
  getAccessToken: () => localStorage.getItem(AccessToken),
  removeAccessToken: () => localStorage.removeItem(AccessToken),

  // Referral Code
  getLSReferralCode: () => {
    const parsed = queryString.parse(location.search);
    if (parsed[ReferralCodeQuery]) return parsed[ReferralCodeQuery] as string;
    return localStorage.getItem(ReferralCode);
  },
  setLSReferralCode: (code: string) => localStorage.setItem(ReferralCode, code),
  removeLSReferralCode: () => localStorage.removeItem(ReferralCode),

  // Private token
  setPrivateToken: (token: string = "") =>
    localStorage.setItem(PrivateToken, token),
  getPrivateToken: () => localStorage.getItem(PrivateToken),
  removePrivateToken: () => localStorage.removeItem(PrivateToken),

  // Locale
  setLocale: (locale: string) => localStorage.setItem("locale", locale),
  getLocale: () => localStorage.getItem("locale"),

  logout: () => {
    AppActions.removeAccessToken();
    AppActions.removePrivateToken();
  },
};
