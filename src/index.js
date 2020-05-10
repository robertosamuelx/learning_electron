const { app, BrowserWindow, Notification, globalShortcut , ipcMain} = require('electron');

function createWindow(){
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    let myNotification = new Notification({
        title: 'Electron test',
        body: 'My electron test'
      })
      
      myNotification.onclick = () => {
        console.log('Notificação clicada')
      }

      myNotification.show();

      win.setProgressBar(0.5);

        win.once('focus', () => win.flashFrame(false))
        win.flashFrame(true)

      win.setThumbarButtons([{
          tooltip: 'button1',
          icon: 'C:/Users/rober/Pictures/images.png',
          click(){console.log('button clicked')}
      }]);

    win.setOverlayIcon('C:/Users/rober/Pictures/images.png','Online');

    win.webContents.openDevTools();
    win.loadFile("src/index.html");
}

app.whenReady().then(() => {
    globalShortcut.register('Control+P', () => console.log('print'));
    createWindow();
});

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin')
        app.quit();
});

app.on('activate', ()=> {
    if(BrowserWindow.getAllWindows().length === 0)
        createWindow();
});

app.setUserTasks([{
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
}]);

ipcMain.on('online-status-changed',(event,status) => console.log(status));

ipcMain.on('ondragstart', (event, filePath) => {
    event.sender.startDrag({
      file: filePath,
      icon: 'C:/Users/rober/Pictures/images.png'
    })
  })