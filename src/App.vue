<template>
  <div id="app">
    <div class="hero is-primary is-fullheight">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand" v-if="isAuth">
              <a class="navbar-item">
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
                  <router-link to="/subscribe" class="navbar-item">Subscribe</router-link>
                  <router-link to="/send" class="navbar-item">Send</router-link>
                  <a class="navbar-item" @click="logout">Logout</a>
                </template>
                <template v-else>
                  <router-link to="/" class="navbar-item" exact>Login</router-link>
                </template>
                  
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
