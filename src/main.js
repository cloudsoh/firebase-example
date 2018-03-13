// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import VueFire from 'vuefire'
import firebase from 'firebase'
require('firebase/firestore')
import store from '@/store/index'
// import admin from 'firebase-admin'

var config = {
    apiKey: 'AIzaSyCJJwbDRjROVaGhpMaJ01I2SyjKcrmn324',
    authDomain: 'cloudsoh-193811.firebaseapp.com',
    databaseURL: 'https://cloudsoh-193811.firebaseio.com',
    projectId: 'cloudsoh-193811',
    storageBucket: 'cloudsoh-193811.appspot.com',
    messagingSenderId: '901374182728'
}

// var serviceAccount = require('@/assets/cloudsoh-193811-firebase-adminsdk-9s856-6b0a30fa22.json')

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://cloudsoh-193811.firebaseio.com'
// })

Vue.use(VueFire)
Vue.use(Buefy)

Vue.config.productionTip = false

let app
var firebaseApp = firebase.initializeApp(config)
var db = firebaseApp.database()
const messaging = firebase.messaging()
var firestore = firebaseApp.firestore()
let subscriberRef = db.ref('/blog-subscribers')

messaging.usePublicVapidKey('BBJJhuNELViHHXLt3m3oWwfKlcV7NpIRvsL1jBI4pU_d7p0A3-pREnsrn6W9wGY2OQ_qnX1mEKB5aavsBXiM36g')
messaging.requestPermission()
    .then(function () {
        console.log('Notification permission granted.')
        // Get Instance ID token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        messaging.getToken()
            .then(function (currentToken) {
                if (currentToken) {
                    console.log('token = ' + currentToken)
                    firestore.collection('subscribers').add({
                        id: currentToken
                    })
                        .then(function (docRef) {
                            console.log('Document written with ID: ', docRef.id)
                        })
                        .catch(function (error) {
                            console.error('Error adding document: ', error)
                        })
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
            console.log('Token refreshed.')
            // Indicate that the new Instance ID token has not yet been sent to the
            // app server.
            // setTokenSentToServer(false);
            // Send Instance ID token to app server.
            // sendTokenToServer(refreshedToken);
            // ...
        })
        .catch(function (err) {
            console.log('Unable to retrieve refreshed token ', err)
            // showToken('Unable to retrieve refreshed token ', err);
        })
})

messaging.onMessage(function (payload) {
    console.log('Message received. ', payload)
    // ...
})
/* eslint-disable no-new */

firebase.auth().onAuthStateChanged((user) => {
    app = new Vue({
        el: '#app',
        router,
        store,
        components: { App },
        data: {
        },
        computed: {
        },
        firebase: {
            subscribers: subscriberRef.limitToLast(25)
            // subscribers: {
            //     source: db.ref('/blog-subscribers'),
            //     asObject: true
            // }
        },
        created () {
            // subscriberRef.on('value', (snapshot) => {
            //     if (this.firebase.subscribers) { this.firebase.subscribers = snapshot.val() }
            // })
            // if ('serviceWorker' in navigator) {
            //     window.addEventListener('load', function () {
            //         navigator.serviceWorker.register('/sw.js').then(function (registration) {
            //             // Registration was successful
            //             console.log('ServiceWorker registration successful with scope: ', registration.scope)
            //         }, function (err) {
            //             // registration failed :(
            //             console.log('ServiceWorker registration failed: ', err)
            //         })
            //     })
            // }
        },
        template: '<App/>'
    })
    if (user) {
        app.$store.dispatch('login', user)
    }
})
