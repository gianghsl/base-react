import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Packages. `react` related packages come first.
            ["^react", "^@?\\w"],
            // Side effect imports.
            ["^\\u0000"],
            // Internal components, packages.
            ["^(@/components)(/.*|$)"],
            ["^(@)(/.*|$)"],
            // Parent imports. Put `..` last.
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Other relative imports. Put same-folder imports and `.` last.
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Style imports.
            ["^.+\\.(css)$", "^.+\\.(scss)$"],
          ],
        },
      ],
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            // Prevent services from importing from each other
            {
              target: "src/services/app/**/*",
              from: [
                "src/services/user/**/*",
                "src/services/service_dumb/**/*",
              ],
              message: "Cross-service import is not allowed in `app`.",
            },
            {
              target: "src/services/user/**/*",
              from: ["src/services/app/**/*", "src/services/service_dumb/**/*"],
              message: "Cross-service import is not allowed in `user`.",
            },
            {
              target: "src/services/service_dumb/**/*",
              from: ["src/services/app/**/*", "src/services/user/**/*"],
              message: "Cross-service import is not allowed in `service_dumb`.",
            },

            // Prevent component modules from importing from each other
            {
              target: "src/components/modules/dumb/**/*",
              from: "src/components/modules/homepage/**/*",
              message:
                "Cross-module import is not allowed. `dumb` cannot import from `homepage`.",
            },
            {
              target: "src/components/modules/homepage/**/*",
              from: "src/components/modules/dumb/**/*",
              message:
                "Cross-module import is not allowed. `homepage` cannot import from `dumb`.",
            },
          ],
          basePath: ".",
        },
      ],
    },
    settings: {
      "import/resolver": {
        typescript: {},
      },
    },
  },
  eslintPluginPrettierRecommended,
);
