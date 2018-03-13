importScripts('/__/firebase/4.10.1/firebase.js')
importScripts('/__/firebase/4.10.1/firebase-firestore.js')

var config = {
    apiKey: 'AIzaSyCJJwbDRjROVaGhpMaJ01I2SyjKcrmn324',
    authDomain: 'cloudsoh-193811.firebaseapp.com',
    databaseURL: 'https://cloudsoh-193811.firebaseio.com',
    projectId: 'cloudsoh-193811',
    storageBucket: 'cloudsoh-193811.appspot.com',
    messagingSenderId: '901374182728'
}

var firebaseApp = firebase.initializeApp(config)
// let subscriberRef = db.ref('/blog-subscribers')

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload)
    // Customize notification here
    var notificationTitle = 'Background Message Title'
    var notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    }

    return self.registration.showNotification(notificationTitle,
        notificationOptions)
})
