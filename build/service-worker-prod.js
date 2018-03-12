(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors.
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  window.addEventListener('load', function() {
      if ('serviceWorker' in navigator &&
          (window.location.protocol === 'https:' || isLocalhost)) {
        navigator.serviceWorker.register('service-worker.js')
        .then(function(registration) {
          // updatefound is fired if service-worker.js changes.
          registration.onupdatefound = function() {
            // updatefound is also fired the very first time the SW is installed,
            // and there's no need to prompt for a reload at that point.
            // So check here to see if the page is already controlled,
            // i.e. whether there's an existing service worker.
            if (navigator.serviceWorker.controller) {
              // The updatefound event implies that registration.installing is set
              var installingWorker = registration.installing;

              installingWorker.onstatechange = function() {
                switch (installingWorker.state) {
                  case 'installed':
                    // At this point, the old content will have been purged and the
                    // fresh content will have been added to the cache.
                    // It's the perfect time to display a "New content is
                    // available; please refresh." message in the page's interface.
                    break;

                  case 'redundant':
                    throw new Error('The installing ' +
                                    'service worker became redundant.');

                  default:
                    // Ignore
                }
              };
            }
          };
        }).catch(function(e) {
          console.error('Error during service worker registration:', e);
        });
      }else{
        console.log('it"s registered')
      }
  });
})();

var config = {
  apiKey: 'AIzaSyCJJwbDRjROVaGhpMaJ01I2SyjKcrmn324',
  authDomain: 'cloudsoh-193811.firebaseapp.com',
  databaseURL: 'https://cloudsoh-193811.firebaseio.com',
  projectId: 'cloudsoh-193811',
  storageBucket: 'cloudsoh-193811.appspot.com',
  messagingSenderId: '901374182728'
}

var firebaseApp = firebase.initializeApp(config)
var db = firebaseApp.firestore()
// let subscriberRef = db.ref('/blog-subscribers')

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
          console.log("token = "+currentToken)
          db.collection("subscribers").add({
            iid: currentToken
          })
            .then(function (docRef) {
              console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
              console.error("Error adding document: ", error);
            });
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

messaging.onTokenRefresh(function () {
  messaging.getToken()
    .then(function (refreshedToken) {
      console.log('Token refreshed.');
      // Indicate that the new Instance ID token has not yet been sent to the
      // app server.
      // setTokenSentToServer(false);
      // Send Instance ID token to app server.
      // sendTokenToServer(refreshedToken);
      // ...
    })
    .catch(function (err) {
      console.log('Unable to retrieve refreshed token ', err);
      // showToken('Unable to retrieve refreshed token ', err);
    });
});