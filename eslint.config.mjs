import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    {
        ignores: ['dist/**']
    },

    js.configs.recommended,

    ...tseslint.configs.recommended,

    {
        files: ['src/**/*.ts'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: {
                ...globals.browser
            }
        },
        plugins: {
            import: importPlugin,
            prettier: prettierPlugin
        },
        settings: {
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json'
                },
                node: {
                    extensions: ['.js', '.ts', '.mjs', '.cjs']
                }
            }
        },
        rules: {
            ...importPlugin.configs.recommended.rules,
            ...importPlugin.configs.typescript.rules,
            ...prettierPlugin.configs.recommended.rules,

            'import/order': [
                'error',
                {
                    groups: [
                        ['external', 'builtin'],
                        'internal',
                        ['parent', 'sibling', 'index']
                    ],
                    alphabetize: {order: 'asc', caseInsensitive: true},
                    'newlines-between': 'always'
                }
            ],

            'import/extensions': [
                'error',
                'never',
                {ts: 'never', tsx: 'never'}
            ]
        }
    },

    prettierConfig
];
