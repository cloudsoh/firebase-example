importScripts('/__/firebase/4.10.1/firebase.js')
importScripts('/__/firebase/4.10.1/firebase-firestore.js')

// Get config file from Firebase
var config = {
    apiKey: 'apiKey',
    authDomain: 'authDomain',
    databaseURL: 'databaseURL',
    projectId: 'projectId',
    storageBucket: 'storageBucket',
    messagingSenderId: 'messagingSenderId'
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
