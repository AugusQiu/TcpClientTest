const path = require('path')
const merge = require('webpack-merge')
module.exports = {
	webpack(config, env) {
		let _config = merge(config, {
			target: 'electron-renderer',
			resolve: {
				alias: {
					'@': path.resolve(__dirname, './src')
				}
			}
		})
		return _config
	}
}
