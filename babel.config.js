module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: [
      '@babel/plugin-proposal-async-generator-functions',
      '@babel/plugin-proposal-class-properties',
      ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
      '@babel/plugin-proposal-do-expressions',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-numeric-separator',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-private-methods',
      '@babel/plugin-proposal-private-property-in-object',
      [
        'formatjs',
        {
          idInterpolationPattern: '[folder]_[name]_[contenthash:8]',
          ast: true,
        },
      ],
    ],
  };
};
