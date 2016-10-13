var webpack = require('webpack');
// TODO: add jshint

var config = {
	context: __dirname + '/src',
	entry: './index.js',
	output: {
		path: __dirname + '/src',
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'ng-annotate!babel',
				exclude: /node_modules/
			},
			{test: /\.html$/, loader: 'raw', exclude: /node_modules/},
			{test: /\.scss/, loader: 'style!css!sass', exclude: /node_modules/}
		]
	},

	plugins: [],

	devtool: 'source-map'
};

if (process.env.NODE_ENV == 'production') {
	config.output.path = __dirname + '/dist';

	config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;