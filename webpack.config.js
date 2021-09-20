const webpack = require("webpack");

const path = require("path");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const WebpackBar = require("webpackbar");

const ASSET_PATH = process.env.ASSET_PATH || '/';
// /goit-js-hw-12-countries/
const loadModeConfig = (env) =>
  require(`./build-utils/${env.mode}.config.js`)(env);

module.exports = (env) =>
  merge(
    {
      mode: env.mode,
      context: path.resolve(__dirname, "src"),

      entry: "./index.js",
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        publicPath: ASSET_PATH,
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ["babel-loader"],
          },
          {
            test: /\.html$/,
            use: ["html-loader"],
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  name: "[path]/[name].[ext]",
                  limit: false,
                },
              },
            ],
          },
          {
            test: /\.hbs$/,
            exclude: /node_modules/,
            use: ["handlebars-loader"],
          },
        ],
      },
      plugins: [
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new WebpackBar(),
        new webpack.DefinePlugin({
          'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
        }),
      ],
    },
    loadModeConfig(env),
  );
