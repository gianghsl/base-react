import { cva } from "class-variance-authority";

export const classes = cva("", {
  variants: {
    variant: {
      "class-name": "className",
    },
  },
});
