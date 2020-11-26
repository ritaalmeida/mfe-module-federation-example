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
    port: 3002,
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
      name: "checkout",
      filename: "remoteEntry.js",
      remotes: {
        "team-shell": "shell@http://localhost:3000/remoteEntry.js",
        "team-landing": "landing@http://localhost:3001/remoteEntry.js",
      },
      exposes: {
        "./Checkout": "./src/federated/Checkout",
        "./BuyButton": "./src/federated/BuyButton",
        "./Cart": "./src/federated/Cart",
      },
      shared: [deps],
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
