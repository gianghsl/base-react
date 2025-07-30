export const AppName = "AppName";
export const AccessToken = AppName + "_access_token";
export const ReferralCode = AppName + "_referral_code";
export const PrivateToken = AppName + "_private_token";
export const ReferralCodeQuery = "referralCode";

export enum AppStatus {
  IDLE = "IDLE",
  INITIALIZED = "INITIALIZED",
}

export const SizeMb = 5;
export const FileMaxSize = 1024 * 1024 * SizeMb; // 5MB
export const FileAllowExtensions = [".jpg", ".jpeg", ".png"];

export const SlugRegex = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/;
export const LetterNumberSpecialCharacterRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/;
export const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
