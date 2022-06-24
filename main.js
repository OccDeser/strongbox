/*
 * @Author: OccDeser 2287109950@qq.com
 * @Date: 2022-06-24 23:01:00
 * @LastEditTime: 2022-06-24 23:49:01
 * @FilePath: /strongbox/main.js
 * @Description: main
 * @Encoding: UTF-8
 */

const { app, BrowserWindow, nativeImage } = require('electron');
const path = require('path')
const url = require('url')

function createWindow() {
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: "Strongbox",
        icon: nativeImage.createFromPath('public/favicon.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true,
            webSecurity: false,
            nodeIntegrationInSubFrames: true
        }
    });

    // // 加载应用 --打包react应用后，__dirname为当前文件路径
    // mainWindow.loadURL(url.format({
    //     pathname: path.join(__dirname, './build/index.html'),
    //     protocol: 'file:',
    //     slashes: true
    // }));

    // 加载应用--开发阶段  需要运行 npm run start
    mainWindow.loadURL('http://localhost:3000/');

    // 解决应用启动白屏问题
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
        mainWindow.focus();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
});