module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true
    },
    extends: 'eslint:recommended',
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        indent: ['error', 4],
        quotes: ['error', 'single'],
        'no-console': 0,
        semi: ['error', 'never'],
        'no-unused-vars': 'off'
    }
}
