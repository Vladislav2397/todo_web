module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: [
        'react-refresh',
        'import'
    ],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'semi': ['warn', 'never'],
        "import/order": [
            "error",
            {
                /*
                    // 1. node "builtin" modules
                    import fs from 'fs';
                    import path from 'path';
                    // 2. "external" modules
                    import _ from 'lodash';
                    import chalk from 'chalk';
                    // 3. "internal" modules
                    // (if you have configured your path or webpack to handle your internal paths differently)
                    import foo from 'src/foo';
                    // 4. modules from a "parent" directory
                    import foo from '../foo';
                    import qux from '../../foo/qux';
                    // 5. "sibling" modules from the same or a sibling's directory
                    import bar from './bar';
                    import baz from './bar/baz';
                    // 6. "index" of the current directory
                    import main from './';
                    // 7. "object"-imports (only available in TypeScript)
                    import log = console.log;
                    // 8. "type" imports (only available in Flow and TypeScript)
                    import type { Foo } from 'foo';
                 */
                "groups": [
                    "builtin",
                    "external",
                    "internal",
                    "parent",
                    "sibling",
                    "object",
                    "type",
                    "index",
                ],
                'newlines-between': 'always',
                "pathGroups": [
                    {
                        "pattern": "react",
                        "group": "builtin",
                        "position": "before"
                    },
                    {
                        "pattern": "@/app/**",
                        "group": "internal",
                        "position": "after"
                    },
                    {
                        "pattern": "@/pages/**",
                        "group": "internal",
                        "position": "after"
                    },
                    {
                        "pattern": "@/widgets/**",
                        "group": "internal",
                        "position": "after"
                    },
                    {
                        "pattern": "@/features/**",
                        "group": "internal",
                        "position": "after"
                    },
                    {
                        "pattern": "@/entities/**",
                        "group": "internal",
                        "position": "after"
                    },
                    {
                        "pattern": "@/shared/**",
                        "group": "internal",
                        "position": "after"
                    },
                ]
            }
        ]
    },
}
