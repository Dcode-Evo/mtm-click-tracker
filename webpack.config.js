const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const isProd = process.argv[process.argv.indexOf('--mode') + 1] === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    'mtm-click-tracker': path.resolve(__dirname, './src/mtm-click-tracker.ts'),
    'mtm-ct-auto': path.resolve(__dirname, './src/mtm-ct-auto.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `[name].js`,
    globalObject: 'this',
    clean: isProd,
    publicPath: '/',
    library: {
      type: 'umd',
    },
  },
  devtool: 'source-map',
  devServer: {
    open: ['/'],
    port: 3000,
    hot: true,
    liveReload: true,
    static: ['demo', 'dist'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
  },
  optimization: {
    minimize: isProd,
    minimizer: [
      new TerserPlugin(),
    ],
  },
};
