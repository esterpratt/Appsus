'use strict';
//children
import searchEmail from '../cmps/mister-email/search-email.cmp.js'
import filterEmail from '../cmps/mister-email/filter-email.cmp.js'
import emailList from '../cmps/mister-email/email-list.cmp.js'
import emailDetails from '../cmps/mister-email/email-details.cmp.js'
import emailStatus from '../cmps/mister-email/email-status.cmp.js'

import emailService from '../services/emails-service.js'



export default {

    template: `
            <section>
            <h2>Mister Email App</h2>
            <search-email> </search-email>
            <filter-email> </filter-email>
            <email-list :emails="mailList" > </email-list> 
            <email-details> </email-details>
            <email-status> </email-status>
            </section>
    `,

    components: {
        searchEmail,
        filterEmail,
        emailList,
        emailDetails,
        emailStatus,
    },

    data() {
        return {
            searchTxt: '',
            currEmail: null,
            mailList: [],

        }
    },

    computed: {

    },

    methods: {

    },

    created() {
        emailService.getMails()
        .then(mails => this.mailList = mails)
        console.log('mister-email created')
    },
}