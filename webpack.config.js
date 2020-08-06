const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    //the output folder should be the entire folder
    //so it will update the js and html files
    path: path.resolve(__dirname, "./dist"),
    filename: "js/main.js",
  },
  devServer: {
    contentBase: "./dist", //path.join(__dirname, "./dist"),
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "./src/assets/images", to: "assets/images" }],
    }),
  ],
  resolve: {
    modules: [path.resolve(__dirname, "./src"), "node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|svg|otf|m4a)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "assets/images",
        },
      },
    ],
  },
};
