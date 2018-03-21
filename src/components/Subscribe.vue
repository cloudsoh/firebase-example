<template lang="pug">
.hero-body.columns.is-centered
    .container
        div
            button.button(@click="subscribe") Subscribe
            button.button(@click="unsubscribe") Unsubscribe
        b-field(label="Topic")
            b-input(v-model="topic")
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            topic: null,
            target: null
        }
    },
    methods: {
        subscribe () {
            this.$root.messaging.requestPermission().then(() => {
                this.$root.messaging.getToken().then((currentToken) => {
                    if (currentToken) {
                        let data = {
                            token: currentToken,
                            topic: this.topic
                        }
                        axios.post(`${process.env.API_URL}/api/blog/subscribe`, data)
                            .then((response) => {
                                console.log(response)
                            }).catch((err) => {
                                console.log(err.response)
                            })
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
        },
        unsubscribe () {
            this.$root.messaging.requestPermission().then(() => {
                this.$root.messaging.getToken().then((currentToken) => {
                    if (currentToken) {
                        let data = {
                            registration_tokens: [currentToken],
                            to: `/topics/${this.topic}`
                        }
                        axios.post(`${process.env.API_URL}/api/blog/unsubscribe`, data)
                            .then((response) => {
                                console.log(response)
                            }).catch((err) => {
                                console.log(err.response)
                            })
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
