export const isNotNumeric = (value: unknown): boolean =>
  !value || Number.isNaN(+value);

export const getCeilNumber = (
  number: number | string,
  decimal: number = 10,
): number =>
  isNotNumeric(number) ? 0 : Math.ceil(+number * 10 ** decimal) / 10 ** decimal;

export const getFloorNumber = (
  number: number | string,
  decimal: number = 10,
): number =>
  isNotNumeric(number) || Number.isNaN(+number)
    ? 0
    : Math.floor(+number * 10 ** decimal) / 10 ** decimal;

export const intlNumberFormat = (
  value: number,
  options?: Intl.NumberFormatOptions,
): string => {
  return new Intl.NumberFormat(
    "en-US",
    options || { maximumFractionDigits: 10 },
  ).format(value);
};

export interface FormatCurrencyParams {
  value: number | string;
  currency?: string;
  isPrefix?: boolean;
  isWithoutSpace?: boolean;
  format?: "floor" | "ceil";
  options?: Intl.NumberFormatOptions;
  decimal?: number;
}

export const formatCurrency = ({
  value,
  currency = "",
  isPrefix = false,
  isWithoutSpace = false,
  format = "floor",
  options,
  decimal = 10,
}: FormatCurrencyParams): string => {
  const displayCurrency = currency || "";
  const space = isWithoutSpace ? "" : " ";
  const displaySpace = currency ? space : "";

  let formattedValue = +value;
  if (format === "floor") {
    formattedValue = getFloorNumber(value, decimal);
  } else if (format === "ceil") {
    formattedValue = getCeilNumber(value, decimal);
  }

  const number = intlNumberFormat(formattedValue, options);

  return isPrefix
    ? displayCurrency + displaySpace + number
    : number + displaySpace + displayCurrency;
};

export function parseFormattedNumber(
  formattedStr: string,
  locale: string = "en-US",
): number {
  const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
  const groupSymbol = parts.find((p) => p.type === "group")?.value || ",";
  const decimalSymbol = parts.find((p) => p.type === "decimal")?.value || ".";

  const normalized = formattedStr
    .replace(new RegExp("\\" + groupSymbol, "g"), "")
    .replace(decimalSymbol, ".");

  return Number(normalized);
}
