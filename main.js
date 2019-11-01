const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')
// 浏览器引用
let window

// 创建浏览器窗口函数
let createWindow = () => {

	// windows下 ctrl+Y 调用调试模式
	globalShortcut.register('CommandOrControl+Y', () => {
		window.webContents.openDevTools()
	})

	// 创建浏览器窗口
	window = new BrowserWindow({
		width: 1000,
		height: 900,
		show: false,
		webPreferences: { webSecurity: false }
	})
	window.once('ready-to-show', () => {
		window.show()
	})

	// 加载应用中的index.html文件
	window.loadURL(`file://${__dirname}/build/index.html`)
	// window.loadURL(`http://localhost:3000`)

	// 当window被关闭时，除掉window的引用
	window.on('closed', () => {
		window = null
	})
}

// 当app准备就绪时候开启窗口
app.on('ready', createWindow)

// 当全部窗口都被关闭之后推出
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

// 在macos上，单击dock图标并且没有其他窗口打开的时候，重新创建一个窗口
app.on('activate', () => {
	if (window == null) {
		createWindow()
	}
})

//主进程与渲染进程通信
ipcMain.on('sys', (e, arg) => {
	if (arg.close) process.exit()
	if (arg.size) {
		let sizeObj = arg.size
		window.setBounds({ maxWidth: 10000, maxHeight: 10000, ...sizeObj })
	}
})
