'use strict'

export default {
    template: `
    <section class="flex">
         <input @click="sendNavFilter" class="inline" type="radio" v-model="navValue" value="all">All
         <input @click="sendNavFilter" class="inline" type="radio" v-model="navValue" value="read">Read
         <input @click="sendNavFilter" class="inline" type="radio" v-model="navValue" value="unread">Unread
</section>
    `,
    data() {
        return {
            navValue: 'all',
        }
    },
    methods: {
        sendNavFilter() {
            this.$emit('setNavFilter', this.navValue);
            console.log ('setnavfilter working and sending ' , this.navValue)
        }
    }
}