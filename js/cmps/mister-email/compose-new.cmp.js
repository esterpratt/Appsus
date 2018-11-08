'use strict'
//parent is mister email in pages

import emailService from '../../services/emails-service.js'

export default {
    template: `
    <section class="compose-new flex-col">
        <input type="text" v-model="email.subject" placeholder="Subject" class="compose-subject">
        <textarea type="text" v-model="email.body" placeholder="Body" class="compose-body"></textarea>
        <button @click="saveEmail()"> Send </button>
    </section>
    `,
    data() {
        return {
            email: {
                subject: '',
                body: '',
            }
        }
    },

    created() {
        console.log('compose cmp created')
    },

    methods: {
        saveEmail() {
            emailService.createEmail(this.email.subject, this.email.body)
        }
    }

}