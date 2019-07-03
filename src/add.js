const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const closeBtn = document.getElementById('closeBtn')
const closeBtn2 = document.getElementById('closeBtn2')


closeBtn.addEventListener('click', function(event) {
    var window = remote.getCurrentWindow();
    window.close()
})

closeBtn2.addEventListener('click', function(event) {
    var window = remote.getCurrentWindow();
    window.close()
})

const updateBtn = document.getElementById('updateBtn')
const updateBtn2 = document.getElementById('updateBtn2')


updateBtn.addEventListener('click', function() {
    ipc.send('update-notify-value', document.getElementById('notifyVal').value)

    var window = remote.getCurrentWindow();
    window.close()
})

updateBtn2.addEventListener('click', function() {
    ipc.send('update-notify-value2', document.getElementById('notifyVal2').value)

    var window = remote.getCurrentWindow();
    window.close()
})