const path = require('path');
const { mergeConfig } = require('vite');

const config = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-actions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config, { configType }) {
    if (configType === 'DEVELOPMENT') {
      return mergeConfig(config, {
        resolve: {
          alias: {
            '@constants': path.resolve(__dirname, '../src/constants'),
            components: path.resolve(__dirname, '../src/components'),
            assets: path.resolve(__dirname, '../src/assets'),
            helpers: path.resolve(__dirname, '../src/helpers'),
            contexts: path.resolve(__dirname, '../src/contexts'),
            hooks: path.resolve(__dirname, '../src/hooks'),
            hocs: path.resolve(__dirname, '../src/hocs'),
            layouts: path.resolve(__dirname, '../src/layouts'),
            pages: path.resolve(__dirname, '../src/pages'),
            reducers: path.resolve(__dirname, '../src/reducers'),
            routes: path.resolve(__dirname, '../src/routes'),
            styles: path.resolve(__dirname, '../src/styles'),
            types: path.resolve(__dirname, '../src/types'),
            services: path.resolve(__dirname, '../src/services'),
            'mock-data': path.resolve(__dirname, '../src/mock-data'),
          },
        },
      });
    }
    return config;
  },
};

module.exports = config;
