<template lang="pug">
.is-centered.columns
    .box
        .field
            label.label Email
            .control
                input.input(
                    type="email"
                    placeholder="e.g help@cloudsoh.co"
                    ref="email"
                    v-model="email"
                    )

        .field
            label.label Password
            .control.has-icons-right
                input.input(
                    :type="passwordType == true ? 'password' : 'text'"
                    placeholder="e.g mysecretpassword"
                    ref="password"
                    v-model="password"
                    )
                span.icon.is-right(@click="switchType")
                    font-awesome-icon(
                        :icon="icon"
                        :style="{ color: passwordType == true ? 'black' : 'grey'}"
                        )
        .field.is-grouped.is-grouped-right
            .control
                button.button.is-danger(@click="register") Register
            .control
                button.button.is-primary(@click="login") Login

</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faEye from '@fortawesome/fontawesome-free-solid/faEye'
import firebase from 'firebase'

export default {
    components: {
        FontAwesomeIcon
    },
    data () {
        return {
            passwordType: true,
            email: null,
            password: null
        }
    },
    computed: {
        icon () {
            return faEye
        }
    },
    methods: {
        switchType () {
            this.passwordType = !this.passwordType
            this.$refs.password.focus()
        },
        clear () {
            this.email = ''
            this.password = ''
        },
        register () {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then((response) => alert('Successfully register'))
                .catch((error) => console.log('error' + error))
            this.clear()
        },
        login () {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then((response) => {
                    this.$store.dispatch('login', response)
                    this.$router.push('dashboard')
                })
                .catch((error) => alert(error))
        }
    }
}
</script>

<style lang="scss" scoped>
span.icon.is-right{
    cursor: pointer;
    pointer-events: unset
}
</style>
