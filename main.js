const { app, BrowserWindow, Menu, MenuItem } = require("electron");
// app，它着您应用程序的事件生命周期。
// BrowserWindow，它负责创建和管理应用窗口。

// createWindow 函数用于创建一个应用窗口
const createWindow = () => {
	const win = new BrowserWindow({
		// 设置宽高
		width: 368,
		height: 730,
        titleBarStyle: "customButtonsOnHover",

	});
	// 加载静态页面
	//   win.loadFile('index.html')
	// 加载网址
	win.loadURL(
		"https://client.phone.androidscloud.com/cloud/phone/web/#/pages/index/index"
	);
	
	// 1
	try {
		// works with 1.1 too
		win.webContents.debugger.attach("1.2");
	} catch (err) {
		console.log("Debugger attach failed: ", err);
	}

	const isDebuggerAttached = win.webContents.debugger.isAttached();
	console.log("debugger attached? ", isDebuggerAttached);

	win.webContents.debugger.on("detach", (event, reason) => {
		console.log("Debugger detached due to: ", reason);
	});

	win.webContents.debugger.sendCommand("Emulation.setEmitTouchEventsForMouse", {
		enabled: true,
		configuration: "mobile",
	});
	//

	const menu = new Menu();
	menu.append(
		new MenuItem({
			label: "Haji",
			submenu: [
				{
					role: "Quit",
					accelerator: process.platform === "darwin" ? "Cmd+Q" : "Alt+Shift+Q",
					click: () => {
						console.log("Electron rocks!");
					},
				},
				{
					role: "Hide",
					accelerator: process.platform === "darwin" ? "Cmd+W" : "Alt+Shift+W",
					click: () => {
						console.log("Electron rocks!");
					},
				},
				{
					role: "Zoom",
					accelerator: process.platform === "darwin" ? "Cmd+F" : "Alt+Shift+F",
					click: () => {
						console.log("Electron rocks!");
					},
				},
				{
					role: "selectAll",
					accelerator: "Cmd+A",
					click: () => {},
				},
				{
					role: "copy",
					accelerator: "Cmd+C",
					click: () => {},
				},
				{
					role: "paste",
					accelerator: "Cmd+V",
					click: () => {},
				},
				{
					role: "undo",
					accelerator: "Cmd+Z",
					click: () => {},
				},
				{
					role: "redo",
					accelerator: "Cmd+Shift+Z",
					click: () => {},
				},
				{
					role: "reload",
					accelerator: "Cmd+R",
					click: () => {},
				},
			],
		})
	);
	// Menu.setApplicationMenu(menu);
};

// 在应用准备就绪时调用函数 创建窗口
app.whenReady().then(() => {
	createWindow();
});
