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

var firestore = firebaseApp.firestore()
let subscriberRef = db.ref('/blog-subscribers')

firebase.auth().onAuthStateChanged((user) => {
    app = new Vue({
        el: '#app',
        router,
        store,
        components: { App },
        data: {
            messaging: null
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
        methods: {
            requestNotification () {
                this.messaging.requestPermission()
                    .then(() => {
                        console.log('Notification permission granted.')
                        // Get Instance ID token. Initially this makes a network call, once retrieved
                        // subsequent calls to getToken will return from cache.
                        this.getToken()
                    })
                    .catch(function (err) {
                        console.log('Unable to get permission to notify.', err)
                    })
            },
            getToken () {
                this.messaging.getToken()
                    .then(function (currentToken) {
                        if (currentToken) {
                            console.log('token = ' + currentToken)
                            this.addToFireStore('subscribers', {
                                id: currentToken
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
                        // showToken('Error retrieving Instance ID token. ', err)
                        // setTokenSentToServer(false)
                    })
            },
            addToFireStore (url, data) {
                firestore.collection(url).add(data)
                    .then(function (docRef) {
                        console.log('Document written with ID: ', docRef.id)
                    })
                    .catch(function (error) {
                        console.error('Error adding document: ', error)
                    })
            }
        },
        created () {
            this.messaging = firebase.messaging()
            this.messaging.usePublicVapidKey('BCF_JCs8Gr6O2TXD8eADD1ELVd3FPWQ5SEKkbytPD0n_oikhbHBiZKw3YFRKP8qNw3_4wwQ6hNzop9hrwy7R9_Y')
            this.requestNotification()
            this.messaging.onTokenRefresh(() => {
                this.messaging.getToken()
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

            this.messaging.onMessage((payload) => {
                console.log('Message received. ', payload)
                // ...
            })
            /* eslint-disable no-new */
        },
        template: '<App/>'
    })
    if (user) {
        app.$store.dispatch('login', user)
    }
})
