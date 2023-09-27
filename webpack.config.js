require("dotenv").config();

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");

module.exports = {
	entry: "./src/index.tsx",
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "build"),
		publicPath: "/",
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.(ts|tsx)$/,
				loader: "ts-loader",
				options: {
					transpileOnly: true,
				},
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
			{
				test: /\.svg$/,
				use: ["@svgr/webpack", "file-loader"],
			},
		],
	},
	resolve: {
		extensions: [".*", ".js", ".jsx", ".ts", ".tsx"],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "public", "index.html"),
			favicon: "./public/favicon.ico",
		}),
		new DefinePlugin({
			"process.env": JSON.stringify(process.env),
		}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, "build"),
		},
		port: 3000,
		hot: true,
		open: true,
		historyApiFallback: true,
	},
};
