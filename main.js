const exported = require('./index')

const {
	app,
	BrowserWindow
} = require('electron')

const winsettings = {
	width: 300,
	height: 500,
	icon: __dirname + "/assets/mantenimiento-web.ico",
	webPreferences: {
		contextIsolation: false,
		devTools: true,
		nodeIntegration: true,
		nodeIntegrationInWorker: true,
    	enableRemoteModule: true,
	},
	autoHideMenuBar: true,
	frame: false,
	resizable: false,
	maximizable: false,
	fullscreenable: false,
}
let win;
const createWindow = () => {
	win = new BrowserWindow(winsettings)
	win.loadFile('./app/index.html')
	
}


app.whenReady().then(() => {
	exported.pedirDatos();
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



//10800000
setInterval(exported.pedirDatos, 300000);
setInterval(exported.rebootAc, 10800000);
setInterval(() => win.webContents.send("line", exported.pbestado), 301000) 
