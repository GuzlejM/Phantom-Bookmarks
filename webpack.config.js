const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = (env) => {
  const isProduction = env === "production";
  return {
    entry: "./src/index.jsx",
    output: {
      path: path.resolve(__dirname, "build"),
      publicPath: "/",
      filename: "bundle.js",
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    resolve: {
      alias: {
        components: path.resolve(__dirname, "src"),
      },
      extensions: [".js", ".jsx"],
    },
    devServer: {
      static: "./",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.less$/,
          use: ["style-loader", "css-loader", "less-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve("./index.html"),
      }),
    ],
    devtool: isProduction ? "source-map" : "inline-source-map",
  };
};
