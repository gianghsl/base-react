import React, {
  type ChangeEvent,
  type ForwardedRef,
  forwardRef,
  type InputHTMLAttributes,
  useMemo,
} from "react";

import {
  intlNumberFormat,
  parseFormattedNumber,
} from "@/utils/format-currency";

// Define props
export interface InputNumberProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: number;
  onChange?: (value: number | string) => void;
}

const InputNumber = forwardRef(function InputNumber(
  props: InputNumberProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const { value, onChange, ...restProps } = props;

  const defaultValue = useMemo(() => {
    return value?.toString() ? intlNumberFormat(value) : "";
  }, [value]);

  const [displayValue, setDisplayValue] = React.useState<string>(defaultValue);

  const onChangeWithNumberSeparator = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;

      if (!rawValue?.toString()) {
        setDisplayValue("");
        onChange?.("");
        return;
      }

      const isLastCharIsDecimal = rawValue.endsWith(".");
      if (isLastCharIsDecimal) {
        setDisplayValue(rawValue);
        onChange?.(rawValue);
        return;
      }

      const parsed = parseFormattedNumber(rawValue);
      if (Number.isNaN(parsed)) return;

      setDisplayValue(intlNumberFormat(parsed));
      onChange?.(parsed);
    },
    [onChange],
  );

  return (
    <input
      {...restProps}
      ref={ref}
      value={displayValue}
      type="text"
      onChange={onChangeWithNumberSeparator}
    />
  );
});

export default InputNumber;
