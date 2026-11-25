import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  markdown: false,
  ignores: [
    '_site',
    '**/.nuxt',
    '**/.output',
    'apps/docs/app/generated',
    'apps/docs/content',
    'registry',
    'examples',
    'playwright-report',
    'test-results',
    'tests/visual/__screenshots__',
    'llms.txt',
    'llms-full.txt',
    '**/*.md',
  ],
}, {
  // Keep the preset's correctness rules; drop purely cosmetic ordering/newline opinions.
  rules: {
    'antfu/reasonable-newline': 'off',
    'perfectionist/sort-imports': 'off',
    'perfectionist/sort-exports': 'off',
    'perfectionist/sort-named-exports': 'off',
    'perfectionist/sort-named-imports': 'off',
    'jsonc/sort-keys': 'off',
    'test/prefer-lowercase-title': 'off',
    'antfu/if-newline': 'off',
    'antfu/consistent-list-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'jsonc/sort-array-values': 'off',
    'regexp/no-super-linear-backtracking': 'off',
    'regexp/no-unused-capturing-group': 'off',
    'antfu/top-level-function': 'off',
    'style/max-statements-per-line': 'off',
    'style/quote-props': 'off',
    'node/prefer-global/process': 'off',
  },
})
