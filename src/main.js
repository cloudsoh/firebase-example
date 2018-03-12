// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import VueFire from 'vuefire'
import firebase from 'firebase'
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
let subscriberRef = db.ref('/blog-subscribers')

/* eslint-disable no-new */

firebase.auth().onAuthStateChanged((user) => {
    app = new Vue({
        el: '#app',
        router,
        store,
        data: {
        },
        computed: {
        },
        components: { App },
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
