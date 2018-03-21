// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import VueFire from 'vuefire'
import firebase from 'firebase'
import store from '@/store/index'
require('firebase/firestore')

Vue.use(VueFire)
Vue.use(Buefy)

Vue.config.productionTip = false
let app
// Get Key from build's environment key
var firebaseApp = firebase.initializeApp(process.env.FIREBASE_CONFIG)
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

            // get web push certificates from the project's cloud messaging config
            this.messaging.usePublicVapidKey('public_API_key')
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
