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
    port: 3001,
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
      name: "landing",
      filename: "remoteEntry.js",
      remotes: {
        "team-shell": "shell@http://localhost:3000/remoteEntry.js",
        "team-checkout": "checkout@http://localhost:3002/remoteEntry.js",
      },
      exposes: {
        "./Landing": "./src/federated/Landing",
        "./MockedProducts": "./src/federated/mocks/products",
      },
      shared: [deps],
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
