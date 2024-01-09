const path = require("path");
const { merge } = require("webpack-merge");
const postcssPresetEnv = require("postcss-preset-env");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = (config, options) => ({
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(path.resolve(__dirname), "dist"),
    chunkFilename: "three-musketeer/[name].js",
    filename: "three-musketeer.[name].js",
    libraryTarget: "system",
  },
  externals: [
    {
      react: "react",
      "react-dom": "react-dom",
      "react-router-dom": "react-router-dom",
      "@platform/primary-table": "@platform/primary-table",
      "@platform/service-ui-libraries": "@platform/service-ui-libraries",
      "@platform/modals": "@platform/modals",
      "@platform/layout": "@platform/layout",
      "@platform/service-api-utilities":"@platform/service-api-utilities"
    },
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [postcssPresetEnv(), require("autoprefixer")],
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [postcssPresetEnv(), require("autoprefixer")],
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        type: "javascript/auto",
        use: {
          loader: "url-loader",
          options: {
            name: "[hash].[ext]",
            outputPath: "datalake-module/assets",
            esModule: false,
            limit: 5000,
          },
        },
      },
    ],
  },
  plugins: [
    new CompressionPlugin(),
    new ESLintPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
    }),
    new Dotenv({
      path: options.mode == "production" ? "./.env" : "./.env.dev",
    }),
  ],
  mode: "development",
  optimization: {
    minimize: options.mode == "production",
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        cache: true,
        parallel: true,
        terserOptions: {
          extractComments: "all",
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
});
