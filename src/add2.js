const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const closeBtn2 = document.getElementById('closeBtn2')

closeBtn2.addEventListener('click', function(event) {
    var window = remote.getCurrentWindow();
    window.close()
})

const updateBtn2 = document.getElementById('updateBtn2')

updateBtn2.addEventListener('click', function() {
    ipc.send('update-notify-value2', document.getElementById('notifyVal2').value)

    var window = remote.getCurrentWindow();
    window.close()
})