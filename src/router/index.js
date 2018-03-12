import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import Help from '@/components/Help'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
    linkActiveClass: 'is-active',
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/'
        },
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/help',
            name: 'Help',
            component: Help,
            meta: {
                requiresAuth: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    let currentUser = firebase.auth().currentUser
    console.log(`current ${currentUser}`)
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (requiresAuth && !currentUser) {
        next('Home')
    } else if (!requiresAuth && currentUser) next('Dashboard')
    else next()
})

export default router
