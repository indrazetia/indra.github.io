const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BAKYfVsc5FNw4wXJjtzB2wZZIN2gTC413Vn_j3IrV_fTaecpsNSQhoXxeB6CLQ4UD3CuYhGYa9ztDdacJAuyft4",
   "privateKey": "x8gh-YwHGWqqBFS2uq3fYIjemNa1zO71Oz9BPs_bQH4"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dsrwdiN_W0s:APA91bHRr3c95Je3mBPeZ9IcS0_Gk58Z4fJX2ZzBEjSmwGCqM5T2OtwKeaA8S3BrXlq2jw1HRAIXiv9wqLn1ghCYdJuPIvO3EnI_rBN_RvFPhCFzqPfnEXI_HnlGVtg1O-APfVidMm6o",
   "keys": {
       "p256dh": "BMO8VWr4e/nbAR75RqqyvQYD1+p+R8G/pvbOS0GxbNAn4SS4UgibwDfqt2YJfRPCifJsQ3OsJKPD0eVM57J/L2Q=",
       "auth": "oOrfFUlfn/H6S2JcS9UVDg=="
   }
};
const payload = 'Congratulations! Your application can already receive push notifications!';
 
const options = {
   gcmAPIKey: '35069457703',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);