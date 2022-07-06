const {
	app,
	BrowserWindow
} = require('electron')

const winsettings = {
	width: 300,
	height: 500,
	icon: __dirname + "/assets/mantenimiento-web.ico",
	webPreferences: {
		devTools: false,
		nodeIntegration: true,
	},
	autoHideMenuBar: true,
	frame: false,
	resizable: false,
	maximizable: false,
	fullscreenable: false,
}

const createWindow = () => {
	const win = new BrowserWindow(winsettings)

	win.loadFile('./app/index.html')

}


app.whenReady().then(() => {
	createWindow()


	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()

		}
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})