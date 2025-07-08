// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    //   tseslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
    {
        rules: {
            'no-console': 'warn', // Allow console statements
            'no-unused-vars': 'warn', // Warn about unused variables
        },
    }
);