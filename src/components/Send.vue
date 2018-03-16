<template lang="pug">
.hero-body.columns.is-centered
    .container
        b-field(label="Target")
            b-input(v-model="target")
            b-switch(
                type="is-danger"
                v-model="isTopic"
            ) Topic
        b-field(label="Title")
            b-input(v-model="title")
        b-field(label="Message")
            b-input(type="textarea" v-model="message")
        button.button(@click="send('front')") Send(Front)
        button.button(@click="send('back')") Send(Back)
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            target: null,
            isTopic: true,
            title: null,
            message: null
        }
    },
    methods: {
        send (type) {
            let data = {
                'notification': {
                    'title': this.title,
                    'body': this.message,
                    'icon': 'firebase-logo.png',
                    'click_action': 'http://firebase.cloudsoh.co'
                },
                'to': (this.isTopic ? '/topics/' : '') + this.target
            }
            if (type === 'back') {
                axios.post('https://push-notification-laravel.herokuapp.com/api/blog/send', data)
                // axios.post('http://localhost:8000//api/blog/send', data)
                    .then((response) => {
                        console.log(response)
                    }).catch((err) => {
                        console.log(err.response)
                    })
            } else {
                axios.defaults.headers.common['Authorization'] = 'key=AAAA0d4WhUg:APA91bHjlSKyURyKwsBcWff76XdZgA13it5Iw7qKy0efUKCUKHOd4BgGPFoQYOXrABIiAmr9qWpkUL9r1dTnj78im4khwq2vXLVELyKRGEFvW0l-6bGluLTV9T8rDyxFRpjHjSn1rqP5'
                axios.defaults.headers.post['Content-Type'] = 'application/json'
                axios.post(`https://fcm.googleapis.com/fcm/send`, data).then((resp) => {
                    console.log('success', resp)
                }).catch((err) => {
                    console.log('error', err)
                })
            }
        }
    }
}
</script>
