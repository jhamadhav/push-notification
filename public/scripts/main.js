const check = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error('No Service Worker support!')
    }
    if (!('PushManager' in window)) {
        throw new Error('No Push API Support!')
    }
}

const registerServiceWorker = async () => {
    let swRegistration = await navigator.serviceWorker.register('service.js');
    return swRegistration;
}

const requestNotificationPermission = async () => {
    let pushPermission = await window.Notification.requestPermission()
    if (pushPermission !== 'granted') {
        throw new Error('Permission not granted for Notification')
    }
}

const sendLocalNotification = (title = "title", msg = "Default message") => {
    console.log("sending local notification ...")
    let options = {
        body: msg,
        icon: './icons/test.svg',
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: 'push-notification'
    }
    swRegistration.showNotification(title, options);
}

let swRegistration, permission;
const main = async () => {
    check()
    swRegistration = await registerServiceWorker()
    permission = await requestNotificationPermission()
}