module.exports = {
    root: true,
    env: { browser: true, es2020: true, node: true, electronAPI: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'electron'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        "electron/require-remote": "off"
    },
    global: {
        electronAPI: 'readonly'
    }
}
