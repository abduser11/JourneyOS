/**
 * JourneyOS — ESLint Configuration
 *
 * Modern flat config (eslint.config.mjs).
 * Consolidates all rules from the legacy .eslintrc.json into a single file.
 *
 * Rules:
 * - no-console: warn (allow during development, CI should use strict mode)
 * - prefer-const: error (enforce const where possible)
 * - no-unused-vars: warn (allow unused exports for barrel files, allow _ prefix)
 * - @typescript-eslint/no-explicit-any: warn (discourage but don't block)
 * - react/no-array-index-key: warn (discourage index keys)
 */

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Custom project rules
  {
    rules: {
      "no-console": "warn",
      "prefer-const": "error",
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "react/no-array-index-key": "warn",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // Disable no-console for logger and analytics modules (intentional)
  {
    files: [
      "src/core/logger/**",
      "src/core/analytics/**",
    ],
    rules: {
      "no-console": "off",
    },
  },

  // Override default ignores
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    "public/**",
  ]),
]);

export default eslintConfig;
