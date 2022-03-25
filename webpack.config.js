const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  // mode: "development",//production
  // devtool: "inline-source-map",
  entry: {
    index: "./src/index.js",
  },
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
  ],
  performance: {
    hints: 'warning', // 枚举 false关闭
    maxEntrypointSize: 10000000, // 最大入口文件大小
    maxAssetSize: 10000000, // 最大资源文件大小
    assetFilter: function(assetFilename) { //只给出js文件的性能提示
      return assetFilename.endsWith('.js');
    }
  }
};
