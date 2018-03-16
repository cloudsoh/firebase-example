<template lang="pug">
.hero-body.columns.is-centered
    .column.has-text-centered.is-narrow.box.is-half
        h1.is-size-1 asd
        hr
        br
        ul
            li(v-for="subscriber in subscribers" v-text="subscriber['.value']")
        input.input(type="text" placeholder="add data" v-model="newData")
        button.button.is-primary.is-pulled-right(@click="addData") Add
</template>

<script>
export default {
    components: {
    },
    data () {
        return {
            newData: null
        }
    },
    computed: {
        subscribers () {
            return this.$root.subscribers
        }
    },
    methods: {
        addData () {
            this.$root.$firebaseRefs.subscribers.push(this.newData)
            this.$toast.open(`added ${this.newData}`)
            this.newData = ''
        }
    },
    created () {
    }
}
</script>
