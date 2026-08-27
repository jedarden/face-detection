const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const fs = require('fs');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

// Dynamically generate list of model files for precaching
const modelsDirectory = path.join(__dirname, 'public/models');
const modelFiles = fs.existsSync(modelsDirectory)
  ? fs.readdirSync(modelsDirectory).map(file => `models/${file}`)
  : [];

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      // Webpack 5 uses TerserPlugin by default
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
        },
        faceapi: {
          test: /[\\/]node_modules[\\/]face-api\.js/,
          name: 'face-api',
          priority: 20,
        },
      },
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: path.join(__dirname, 'public/sw.js'),
      swDest: 'sw.js',
      exclude: [
        /\.map$/,
        /manifest\.json$/,
        /\.htaccess$/,
        /service-worker\.js$/,
        /sw\.js$/,
      ],
      // Increase max file size to 5MB for model files (default is 2MB)
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      // Precache model files
      additionalManifestEntries: modelFiles.map(file => ({
        url: file,
        revision: Math.random().toString(36).substring(7), // Force cache bust
      })),
    }),
  ],
});