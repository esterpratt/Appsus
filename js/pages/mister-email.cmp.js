'use strict';
//children
import searchEmail from '../cmps/mister-email/search-email.cmp.js'
import sortEmail from '../cmps/mister-email/sort-email.cmp.js'
import emailList from '../cmps/mister-email/email-list.cmp.js'
import emailDetails from '../cmps/mister-email/email-details.cmp.js'
import emailStatus from '../cmps/mister-email/email-status.cmp.js'
import emailPreview from '../cmps/mister-email/email-preview.cmp.js'

// import emailService from '../services/emails-service.js'
import emailsService from '../services/emails-service.js';

export default {

    template: `
            <section class="mister-email flex-col">
    <div class="flex">        
        <div class="left-container flex-col">
            <h2>Mister Email App</h2>
            <search-email @setFilter="setFilter"> </search-email>
            <sort-email> </sort-email>
            <!-- <email-list :emails="mailList" > </email-list>  -->
             <email-preview v-for="currentmail in mailsToShow" @click.native="setCurrMail(currentmail)" :mail="currentmail" @setPercentage="setPercentage"> </email-preview>
        </div>
        <div class="right-container">
            <div @click="goToCompose" class="compose-btn"> Compose New </div>
             <email-details v-if="mailToDisplay" :mailtodisplay="mailToDisplay" > </email-details>
        </div>
    </div>  
            <email-status class="email-status" :percentage="percentageRead"> </email-status>
            </section>
    `,

    components: {
        searchEmail,
        sortEmail,
        emailList,
        emailDetails,
        emailStatus,
        emailPreview,
    },

    data() {
        return {
            searchTxt: '',
            currEmail: null,
            filter: null,
            mailList: [],
            mailToDisplay: null,
            percentageRead: 0,
        }
    },

    computed: {
        mailsToShow() {
            if (!this.filter) return this.mailList;
            return this.mailList
                .filter(mail => mail.subject.toLowerCase().includes(this.filter.toLowerCase())
                    || mail.body.toLowerCase().includes(this.filter.toLowerCase()))
        },
        // mailToDisplay() {
        //     return this.mailList[this.mailList.length-1]
        // },

    },
    methods: {
        setFilter(filter) {
            this.filter = filter
        },
        goToCompose() {
            this.$router.push('/misterEmail/compose');
        },
        setCurrMail(currMail) {
            // console.log(currMail)
            emailsService.setMailRead(currMail.id)
            this.mailToDisplay = currMail;
            this.percentageRead = emailsService.countReadMails()
        },
        setPercentage() {
            this.percentageRead = emailsService.countReadMails()
        }
    },
    created() {
        emailsService.getMails()
            .then(mails => this.mailList = mails)
            .then(() => this.mailToDisplay = this.mailList[this.mailList.length - 1])
        console.log('mister-email created')
    },

}