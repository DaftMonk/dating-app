module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@assets': './src/assets',
            '@svgs': './src/assets/svgs',
            '@fonts': './assets/fonts',
            '@images': './src/assets/images',
            '@screens': './src/screens',
            '@app-types': './src/types',
            '@app-data': './src/data',
            '@constants': './src/constants',
          },
        },
      ],
    ],
  };
};