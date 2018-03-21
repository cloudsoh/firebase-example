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
        button.button(@click="send") Send
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
        send () {
            let data = {
                'notification': {
                    'title': this.title,
                    'body': this.message,
                    'icon': 'firebase-logo.png',
                    'click_action': 'http://your.website.com'
                },
                'to': (this.isTopic ? '/topics/' : '') + this.target
            }
            axios.post(`${process.env.API_URL}/api/blog/send`, data)
                .then((response) => {
                    console.log(response)
                }).catch((err) => {
                    console.log(err.response)
                })
        }
    }
}
</script>
