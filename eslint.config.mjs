import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    '.next/**',
    '.next-yenth/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'src/GameMini_APP_source/**',
    'src/app/GameMini/**/logic.ts',
    'src/app/GameMini/**/*.js',
    'src/app/GameMini/Co/**',
  ]),
]);

export default eslintConfig;
