    // Periksa service worker
if (!('serviceWorker' in navigator)) {
    M.toast({html: 'Service worker is not supported by this browser'});
} else {
    registerServiceWorker();
}
    // Register service worker
function registerServiceWorker() {
    return navigator.serviceWorker.register('/service-worker.js')
        .then(function (registration) {
        console.log('Registrasi service worker berhasil.');
    return registration;
    })
        .catch(function (err) {
            showerror(err);
    });
}

    // Periksa fitur Notification API
if ("Notification" in window) {
    requestPermission();
} else {
    M.toast({html: 'The browser does not support notifications'});
}
    
    // Meminta ijin menggunakan Notification API
function requestPermission() {
    Notification.requestPermission().then(function (result) {
        if (result === "denied") {
            M.toast({html: 'Notification feature not permitted'});
        return;
        } else if (result === "default") {
            M.toast({html: 'The user closes the dialog box requests permission'});
        return;
        }
        console.log('Notification feature allowed');
    });
}
    
    
if (('PushManager' in window)) {
    navigator.serviceWorker.getRegistration().then(function(registration) {
        registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array("BAKYfVsc5FNw4wXJjtzB2wZZIN2gTC413Vn_j3IrV_fTaecpsNSQhoXxeB6CLQ4UD3CuYhGYa9ztDdacJAuyft4")
            //Server key firebase
            //applicationServerKey: urlBase64ToUint8Array("AAAACCpNdSc:APA91bFU1UFke31lF0x8kcrlCzzbkqmwwtkndxwNMHK6GD0ER0KSmUXKS8OLjCpoM5mC0g_DwCfyGNWqhEfw3Xjlv_IVrgJyPC-0EwX_U2wLAysn1SY8J6YaCGSJcW-n9U_VFXvF5NVJ")
        }).then(function(subscribe) {
            console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
            console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('p256dh')))));
            console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('auth')))));
        }).catch(function(e) {
            console.error('Tidak dapat melakukan subscribe ', e.message);
        });
    });
}
    

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}