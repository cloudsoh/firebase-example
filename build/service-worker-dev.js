'use strict'
// This service worker file is effectively a 'no-op' that will reset any
// previous service worker registered for the same host:port combination.
// In the production build, this file is replaced with an actual service worker
// file that will precache your site's local assets.
// See https://github.com/facebookincubator/create-react-app/issues/2272#issuecomment-302832432

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', () => {
  self.clients.matchAll({ type: 'window' }).then(windowClients => {
    for (let windowClient of windowClients) {
      // Force open pages to refresh, so that they have a chance to load the
      // fresh navigation response from the local dev server.
      windowClient.navigate(windowClient.url);
    }
  });
});

var config = {
  apiKey: 'AIzaSyCJJwbDRjROVaGhpMaJ01I2SyjKcrmn324',
  authDomain: 'cloudsoh-193811.firebaseapp.com',
  databaseURL: 'https://cloudsoh-193811.firebaseio.com',
  projectId: 'cloudsoh-193811',
  storageBucket: 'cloudsoh-193811.appspot.com',
  messagingSenderId: '901374182728'
}

firebase.initializeApp(config)

const messaging = firebase.messaging()
messaging.usePublicVapidKey('BBJJhuNELViHHXLt3m3oWwfKlcV7NpIRvsL1jBI4pU_d7p0A3-pREnsrn6W9wGY2OQ_qnX1mEKB5aavsBXiM36g')
messaging.requestPermission()
    .then(function () {
        console.log('Notification permission granted.')
        // Get Instance ID token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        messaging.getToken()
            .then(function (currentToken) {
                if (currentToken) {
                    console.log(currentToken)
                    // sendTokenToServer(currentToken)
                    // updateUIForPushEnabled(currentToken)
                } else {
                    // Show permission request.
                    console.log('No Instance ID token available. Request permission to generate one.')
                    // Show permission UI.
                    // updateUIForPushPermissionRequired()
                    // setTokenSentToServer(false)
                }
            })
            .catch(function (err) {
                console.log('An error occurred while retrieving token. ', err)
                console.log(err)
                // showToken('Error retrieving Instance ID token. ', err)
                // setTokenSentToServer(false)
            })
    })
    .catch(function (err) {
        console.log('Unable to get permission to notify.', err)
    })
    