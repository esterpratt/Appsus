'use strict';
//children
import searchEmail from '../cmps/mister-email/search-email.cmp.js'
import sortEmail from '../cmps/mister-email/sort-email.cmp.js'
import emailList from '../cmps/mister-email/email-list.cmp.js'
import emailDetails from '../cmps/mister-email/email-details.cmp.js'
import emailStatus from '../cmps/mister-email/email-status.cmp.js'
import emailPreview from '../cmps/mister-email/email-preview.cmp.js'
import filterTab from '../cmps/mister-email/filter-tab.cmp.js'

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
                        <div class="flex-col filter-nav">
                              <filter-tab @setNavFilter="setNavFilter"> </filter-tab>
                        </div>
             <!-- <email-list :emails="mailList" > </email-list>  -->
                          <div class="flex-col">
                              <email-preview v-for="currentmail in mailsToShow" @click.native="setCurrMail(currentmail)" :mail="currentmail" @setPercentage="setPercentage"> </email-preview>
                            </div>
        
        </div>
            <div class="right-container">
                        <div @click="goToCompose" class="compose-btn float-right"> Compose New </div>
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
        filterTab,
    },

    data() {
        return {
            searchTxt: '',
            currEmail: null,
            filter: { txt: null, readStat: 'all' },
            mailList: [],
            mailToDisplay: null,
            percentageRead: 0,
        }
    },

    computed: {
        mailsToShow() { //if no filter applied give full list. 
            if (!this.filter.txt && !this.filter.readStat) return this.mailList;
            if (this.filter.txt) {
                var mailsForSearch = this.mailList
                    .filter(mail => mail.subject.toLowerCase().includes(this.filter.txt.toLowerCase())
                        || mail.body.toLowerCase().includes(this.filter.txt.toLowerCase()))
            } else { var mailsForSearch = this.mailList }
            if (this.filter.readStat === 'all') return mailsForSearch;
            if (this.filter.readStat === 'read') return mailsForSearch
                .filter(mail => mail.isRead);
            else return mailsForSearch
                .filter(mail => !mail.isRead)

        },
    },
    methods: {
        setFilter(filtertxt) {
            this.filter.txt = filtertxt
        },
        goToCompose() {
            this.$router.push('/misterEmail/compose');
        },
        setCurrMail(currMail) {
            emailsService.setMailRead(currMail.id)
            this.mailToDisplay = currMail;
            this.percentageRead = emailsService.countReadMails()
        },
        setPercentage() {
            this.percentageRead = emailsService.countReadMails()
        },
        setNavFilter(navFilterValue) {
            this.filter.readStat = navFilterValue;
        }
    },
    created() {
        emailsService.getMails()
            .then(mails => this.mailList = mails)
            .then(() => this.mailToDisplay = this.mailList[this.mailList.length - 1])
        console.log('mister-email created')
    },

}