
var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: 'source-map',
	devServer: {
		historyApiFallback: true
	},
	context: __dirname + '/src',/*__dirname变量获取当前模块文件所在目录的完整绝对路径*/
	entry: './js/root.js',
	module: {
		loaders:[{
			test: /\.js?$/,/*解析所有的js文件*/
			exclude: /(node_modules)/,/*跳过node_modules的文件*/
			loader: 'babel-loader',
			query: {
				presets: ['react','es2015'],
				plugins: ['react-html-attrs']
			}
		},
		/*下面是添加css的loader，也即是css模块化的配置方法*/
		/*loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'*/
		{
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		},
		{
			test:/\.less$/,
			loader:'style-loader!css-loader!less-loader'
		}
	]
	},
	output: {
		path: __dirname + "/src/",
		filename: "bundle.js"
	}
};
