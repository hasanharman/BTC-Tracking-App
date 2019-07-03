const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios')
const ipc = electron.ipcRenderer

const notifyBtn = document.getElementById('notifyBtn')
var price = document.querySelector('h1')
var targetPrice = document.getElementById('targetPrice')
var targetPriceVal

const notifyBtn2 = document.getElementById('notifyBtn2')
var price2 = document.querySelector('#price2')
var targetPrice2 = document.getElementById('targetPrice2')
var targetPrice2Val

const notification = {
    title: 'BTC-TRY Alarmı',
    body: 'BTC hedef değerinize ulaştı!',
    icon: path.join(__dirname, '../assets/images/btc.png')
}

const notification2 = {
    title: 'BTC-USD Alarmı',
    body: 'BTC hedef değerinize ulaştı!',
    icon: path.join(__dirname, '../assets/images/btc.png')
}

function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=TRY')
        .then(res => {
            const cryptos = res.data.BTC.TRY
            price.innerHTML = '₺'+cryptos.toLocaleString('en')

            if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.TRY) {
                const myNotification = new window.Notification(notification.title, notification)
            }

        })
}
function getBTCusd() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
        .then(res => {
            const cryptos = res.data.BTC.USD
            price2.innerHTML = '$'+cryptos.toLocaleString('en')

            if (targetPrice2.innerHTML != '' && targetPrice2Val < res.data.BTC.USD) {
                const myNotification2 = new window.Notification(notification2.title, notification2)
            }

        })
}

getBTC()
setInterval(getBTC, 5000);

getBTCusd()
setInterval(getBTCusd, 5000);

notifyBtn.addEventListener('click', function(event) {
    const modalPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({ frame: false, alwaysOnTop: true, width: 400, height: 200})
    win.on('close', function() { win = null })
    win.loadURL(modalPath)
    win.show()
})

notifyBtn2.addEventListener('click', function(event) {
    const modalPath = path.join('file://', __dirname, 'add2.html')
    let win = new BrowserWindow({ frame: false, alwaysOnTop: true, width: 400, height: 200})
    win.on('close', function() { win = null })
    win.loadURL(modalPath)
    win.show()
})

ipc.on('targetPriceVal', function (event, arg) {
    targetPriceVal = Number(arg)
    targetPrice.innerHTML = '₺'+targetPriceVal.toLocaleString('en')
})

ipc.on('targetPrice2Val', function (event, arg) {
    targetPrice2Val = Number(arg)
    targetPrice2.innerHTML = '$'+targetPrice2Val.toLocaleString('en')
})
