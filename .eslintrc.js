const { defineConfig } = require('eslint-define-config');

const rules = {
  'no-console':
    process.env.NODE_ENV === 'production'
      ? ['warn', { allow: ['warn', 'error'] }]
      : 'off', // 禁用 console
  'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 禁用 debugger
  'import/no-extraneous-dependencies': 'off', // 引入path报错
  'prettier/prettier': 'off',
  /**
   * formatjs
   */
  'formatjs/enforce-id': [
    'error',
    {
      idInterpolationPattern: '[folder]_[name]_[contenthash:8]',
      idWhitelist: [],
    },
  ],

  /**
   * typescript-eslint
   */
  '@typescript-eslint/no-explicit-any': 'off', // any警告
  '@typescript-eslint/no-non-null-assertion': 'off', // 禁止非空断言
  '@typescript-eslint/ban-ts-comment': 'warn',
  '@typescript-eslint/no-use-before-define': ['off'], // 禁止定义前使用

  /**
   * 最佳实践
   */
  'no-use-before-define': 'off', // 禁止定义前使用
  'no-shadow': 'off', // 禁止变量声明覆盖外层作用域的变量
  'no-param-reassign': 'off', // 禁止对函数参数再赋值
  'no-plusplus': 'off', // 禁止使用一元表达式
  'no-bitwise': 'off', // 禁止使用位运算符
  'func-names': 'off', // 要求或禁止使用命名的function表达式
  'import/prefer-default-export': 'off', // 需要有默认导出
  'class-methods-use-this': 'off', // 强制类方法使用this
  'prefer-destructuring': ['error', { array: false, object: false }], // 优先使用数组和对象解构(不强制)
  'no-else-return': ['error', { allowElseIf: true }], // 禁止在else之前返回
  'consistent-return': 'off', // 要求return语句一致返回
  'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'], // 禁止指定的语法
  'lines-between-class-members': [
    'error',
    'always',
    { exceptAfterSingleLine: true },
  ], // 要求或禁止类成员之间有空行
  'no-nested-ternary': 'off', // 不允许嵌套的三元表达式
  'no-continue': 'off', // 不允许continue
  'no-control-regex': ['off'], // 禁止在正则表达式中使用控制字符
  'default-param-last': 'off', // 默认参数最后
  camelcase: ['off'], // 强制执行驼峰命名约定

  'sort-imports': [
    // import 排序
    2,
    {
      ignoreCase: true,
      ignoreDeclarationSort: true,
    },
  ],
  'import/order': [
    2,
    {
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
      'newlines-between': 'never',
    },
  ],
};

module.exports = defineConfig({
  root: true,
  env: {
    node: true,
    browser: true,
  },
  globals: {
    process: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'react-app',
    'plugin:markdown/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'import', 'html', 'formatjs'],
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
          },
        ], // 忽略文件后缀
      },
    },
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },

  ignorePatterns: [
    '**/*.js',
    'build/',
    'dist/',
    'node_modules/',
    'configs/',
    'lib/',
    'scripts/',
    'public/',
    'packages/',
  ],
  rules,
});
