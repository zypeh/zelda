module.exports = {
    parser: '@typescript-eslint/parser',  // typescript-eslint
    plugins: ['sonarjs'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        /* sonarts */
        "no-accessor-field-mismatch": true,
        "no-all-duplicated-branches": true,
        "no-collection-size-mischeck": true,
        "no-dead-store": true,
        "no-duplicated-branches": true,
        "no-element-overwrite": true,
        "no-empty-destructuring": true,
        "no-gratuitous-expressions": true,
        "no-identical-conditions": true,
        "no-identical-expressions": true,
        "no-identical-functions": true,
        "no-ignored-return": true,
        "no-multiline-string-literals": true,
        "no-self-assignment": true,
        "no-unconditional-jump": true,
        "no-unthrown-error": true,
        "no-unused-array": true,
        "no-useless-cast": true,
        "no-useless-increment": true,
        "no-variable-usage-before-declaration": true,
        /* prevent code smell */
        "no-collapsible-if": true,
        "no-duplicate-string": true,
        "no-redundant-boolean": true,
        "prefer-immediate-return": true,
        "prefer-object-literal": true,
        "prefer-while": true,
    },
}