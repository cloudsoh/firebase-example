import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentUser: null,
        loading: null
    },
    getters: {
        isAuth: state => {
            return state.currentUser != null
        }
    },
    mutations: {
        setCurrentUser (state, obj) {
            state.currentUser = obj
        },
        openLoading (state, obj) {
            state.loading = obj
        },
        closeLoading (state) {
            state.loading.close()
        }
    },
    actions: {
        login (context, user) {
            context.commit('setCurrentUser', user)
        },
        logout (context) {
            context.commit('setCurrentUser', null)
        },
        toggleLoading (context, comp) {
            if (context.state.loading == null) { context.commit('openLoading', comp.$loading.open()) } else {
                context.commit('closeLoading')
            }
        }
    }
})
