module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // This integrates Prettier with ESLint
  ],
  plugins: ["@typescript-eslint"],
};
