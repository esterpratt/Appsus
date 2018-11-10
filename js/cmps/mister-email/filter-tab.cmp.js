'use strict'

export default {
    template: `
    <section class="flex">
         <input @change="sendNavFilter" class="inline" type="radio" v-model="navValue" value="all">All
         <input @change="sendNavFilter" class="inline" type="radio" v-model="navValue" value="read">Read
         <input @change="sendNavFilter" class="inline" type="radio" v-model="navValue" value="unread">Unread
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
        }
    }
}