const HtmlWebPackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

const deps = require("./package.json").dependencies;

module.exports = {
  output: {
    publicPath: "auto",
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      filename: "remoteEntry.js",
      remotes: {
        "team-landing": "landing@http://localhost:3001/remoteEntry.js",
        "team-checkout": "checkout@http://localhost:3002/remoteEntry.js",
      },
      exposes: {
        "./Store": "./src/store",
        "./BaseStyles": "./src/styles/base.css",
      },
      shared: [deps],
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
