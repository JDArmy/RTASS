const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./src",
    compress: true,
    port: 9000,
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "docs"),
    clean: false,
  },
  resolve: {
    fallback: {
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "src/index.html"), to: path.resolve(__dirname, "docs/index.html") },
      ],
    }),
  ]
};
