<template>
  <div id="app">
    <div class="hero is-success is-fullheight">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand" v-if="isAuth">
              <a class="navbar-item">
                <!-- <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo"> -->
                Logged in as {{ currentUser.email }}
              </a>
              <span class="navbar-burger burger" data-target="navbarMenuHeroB">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navbarMenuHeroB" class="navbar-menu">
              <div class="navbar-end">
                <template v-if="isAuth">
                  <router-link to="/dashboard" class="navbar-item">Dashboard</router-link>
                  <router-link to="/help" class="navbar-item">Help</router-link>
                  <a class="navbar-item" @click="logout">Logout</a>
                </template>
                <template v-else>
                  <router-link to="/" class="navbar-item" exact>Login</router-link>
                </template>
                  <a class="navbar-item" @click="subscribe">Subscribe</a>
                  <!-- <router-link to="/subscribe" class="navbar-item">Subscribe</router-link> -->
              </div>
            </div>
          </div>
        </nav>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapState, mapGetters } from 'vuex'
import axios from 'axios'

export default {
    name: 'App',
    data () {
        return {
            loadingComponent: null,
            messaging: null
        }
    },
    computed: {
        // ...mapState({
        //     loading: state => {
        //         if (state.loading) {
        //             this.loadingComponent = this.$loading.open()
        //         } else {
        //             this.loadingComponent.close()
        //         }
        //         return state.loading
        //     }
        // }),
        ...mapState(['currentUser']),
        ...mapGetters(['isAuth'])
    },
    methods: {
        logout () {
            firebase.auth().signOut()
                .then((response) => {
                    this.$store.dispatch('logout')
                    this.$router.replace('Home')
                })
                .catch((error) => alert(error))
        },
        subscribe(){
          this.$root.messaging.requestPermission().then(() => {
            this.$root.messaging.getToken().then(function (currentToken) {
              if (currentToken) {
                  axios.defaults.headers.common['Authorization'] = 'key=AAAA0d4WhUg:APA91bHjlSKyURyKwsBcWff76XdZgA13it5Iw7qKy0efUKCUKHOd4BgGPFoQYOXrABIiAmr9qWpkUL9r1dTnj78im4khwq2vXLVELyKRGEFvW0l-6bGluLTV9T8rDyxFRpjHjSn1rqP5';
                  axios.defaults.headers.post['Content-Type'] = 'application/json';
                  axios.post(`https://iid.googleapis.com/iid/v1/${currentToken}/rel/topics/movies`)
                } else {
                  console.log('No Instance ID token available. Request permission to generate one.')
                }
            })
            .catch(function (err) {
              console.log('An error occurred while retrieving token. ', err)
            })
          }).catch(function (err) {
            console.log('Unable to get permission to notify.', err)
          })
        }
    }
}
</script>

<style lang="scss">
@import '~bulma/sass/utilities/_all';

// Custom variables

@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
