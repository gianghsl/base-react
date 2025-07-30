import { type UseFormReturn } from "react-hook-form";
import { AxiosError } from "axios";
import { type DateArg, format, type FormatOptions } from "date-fns";
import { enUS as en } from "date-fns/locale/en-US";
import { toast } from "sonner";

import {
  FileAllowExtensions,
  FileMaxSize,
  SizeMb,
} from "@/services/app/constants";
import { type IErrorForm } from "@/services/app/types";

export const placeholder = (width: number, height: number) =>
  `https://placehold.co/${width}x${height}`;

export const aspectRatio = (
  width: number,
  height: number,
): React.CSSProperties => ({
  aspectRatio: `${width}/${height}`,
  objectFit: "cover",
});

export const backgroundImage = (width: number, height: number) => ({
  backgroundImage: `url(${placeholder(width, height)})`,
});

export const getQueryString = <T extends Record<string, any>>(
  objectData: T | undefined,
): string => {
  if (!objectData) return "";

  const queryString = Object.entries(objectData)
    .filter(
      ([, value]) => value !== null && value !== undefined && value !== "",
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");

  return queryString ? `?${queryString}` : "";
};

export const uppercaseFirstLetter = (str: string) => {
  return str && str.charAt(0).toUpperCase() + str.slice(1);
};

export const getMessageError = (error: any) => {
  const message = "Something went wrong";

  let errorMessage = message;

  if (error instanceof AxiosError) {
    errorMessage =
      error.code === "ERR_NETWORK"
        ? error.message
        : error.response?.data?.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = typeof error === "string" ? error : message;
  }

  return errorMessage || message;
};

export const handleError = (error: any, mes?: string, t?: any) => {
  const result = mes || getMessageError(error);
  const resultMessage = t ? t(result) : result;
  toast.error(resultMessage);
  return resultMessage;
};

export const getFormErrors = (error: any): IErrorForm[] => {
  if (error instanceof AxiosError) {
    return error.response?.data.errors ?? [];
  }

  return [];
};

export const setFormErrors = (
  errors: IErrorForm[],
  form: UseFormReturn<any>,
) => {
  errors.forEach((e) => {
    form.setError(e.param as keyof typeof form.getValues, {
      message: e.msg,
    });
  });
};

export const setFormErrorsOrHandleError = (
  error: any,
  form: UseFormReturn<any>,
  mes?: string,
) => {
  const errors = getFormErrors(error);
  if (errors.length) {
    setFormErrors(errors, form);
  } else {
    handleError(error, mes);
  }
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const randomUID = () => {
  return Math.random().toString(36).substring(2, 15);
};

export const formatDate = (
  date: DateArg<Date> & {},
  formatDate = "dd/MM/yyyy",
  options?: FormatOptions,
) => {
  return format(date, formatDate, { locale: en, ...options });
};

export const getReferralLink = (referralCode: string) => {
  const baseUrl = import.meta.env.VITE_PUBLIC_DOMAIN_URL;
  return `${baseUrl}/?referralCode=${referralCode}`;
};

export function removeDiacritics(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export const getNameFallback = (name: string) => {
  const nameWithoutDiacritics = removeDiacritics(name);
  return (
    nameWithoutDiacritics.charAt(0)?.toUpperCase() +
    nameWithoutDiacritics.charAt(1)?.toUpperCase()
  );
};

export const getFileExtension = (fileName: string) => {
  const parts = fileName.split(".");
  return parts[parts.length - 1];
};

export const validateImageFile = (
  file: File | null,
): [string | null, File | null] => {
  if (!file) return [null, null];

  const fileExtension = getFileExtension(file.name);

  if (file.size > FileMaxSize) {
    return [`File size must not exceed ${SizeMb}MB`, file];
  }

  if (
    !["image/jpeg", "image/png", "image/gif"].includes(file.type) ||
    !FileAllowExtensions.includes("." + fileExtension.toLowerCase())
  ) {
    return ["File type is not allowed", file];
  }

  return [null, file];
};

export const getBirthDay = (birthday?: string) => {
  if (!birthday) return "";
  return formatDate(new Date(), "yyyy-MM-dd");
};

export const isDev = () => import.meta.env.DEV;
