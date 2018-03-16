<template lang="pug">
.hero-body.columns.is-centered
    .container
        div
            button.button(@click="subscribe('front')") Subscribe(Front)
            button.button(@click="subscribe('back')") Subscribe(Back)
            button.button(@click="unsubscribe('front')") unSubscribe(Front)
            button.button(@click="unsubscribe('back')") unSubscribe(Back)
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
        subscribe (pos) {
            this.$root.messaging.requestPermission().then(() => {
                this.$root.messaging.getToken().then((currentToken) => {
                    if (currentToken) {
                        let data = {
                            token: currentToken,
                            topic: this.topic
                        }
                        if (pos === 'back') {
                            axios.post('https://push-notification-laravel.herokuapp.com/api/blog/subscribe', data)
                                .then((response) => {
                                    console.log(response)
                                }).catch((err) => {
                                    // axios.post('http://heroku.cloudsoh.co/api/blog/subscribe', data).then((resp) => {
                                    //   console.log('api ' , resp)
                                    // }).catch((err) => {
                                    //   console.log('api', err.response)
                                    // })
                                    console.log(err.response)
                                })
                        } else {
                            axios.defaults.headers.common['Authorization'] = 'key=AAAA0d4WhUg:APA91bHjlSKyURyKwsBcWff76XdZgA13it5Iw7qKy0efUKCUKHOd4BgGPFoQYOXrABIiAmr9qWpkUL9r1dTnj78im4khwq2vXLVELyKRGEFvW0l-6bGluLTV9T8rDyxFRpjHjSn1rqP5'
                            axios.defaults.headers.post['Content-Type'] = 'application/json'
                            axios.post(`https://iid.googleapis.com/iid/v1/${currentToken}/rel/topics/${this.topic}`).then((resp) => {
                                console.log('success', resp)
                            }).catch((err) => {
                                console.log('error', err)
                            })
                        }
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
        unsubscribe (pos) {
            this.$root.messaging.requestPermission().then(() => {
                this.$root.messaging.getToken().then((currentToken) => {
                    if (currentToken) {
                        let data = {
                            registration_tokens: [currentToken],
                            to: `/topics/${this.topic}`
                        }
                        if (pos === 'back') {
                            axios.post('https://push-notification-laravel.herokuapp.com/api/blog/unsubscribe', data)
                                .then((response) => {
                                    console.log(response)
                                }).catch((err) => {
                                    // axios.post('http://heroku.cloudsoh.co/api/blog/subscribe', data).then((resp) => {
                                    //   console.log('api ' , resp)
                                    // }).catch((err) => {
                                    //   console.log('api', err.response)
                                    // })
                                    console.log(err.response)
                                })
                        } else {
                            axios.defaults.headers.common['Authorization'] = 'key=AAAA0d4WhUg:APA91bHjlSKyURyKwsBcWff76XdZgA13it5Iw7qKy0efUKCUKHOd4BgGPFoQYOXrABIiAmr9qWpkUL9r1dTnj78im4khwq2vXLVELyKRGEFvW0l-6bGluLTV9T8rDyxFRpjHjSn1rqP5'
                            axios.defaults.headers.post['Content-Type'] = 'application/json'
                            axios.post(`https://iid.googleapis.com/iid/v1:batchRemove`, data).then((resp) => {
                                console.log('success', resp)
                            }).catch((err) => {
                                console.log('error', err)
                            })
                        }
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
