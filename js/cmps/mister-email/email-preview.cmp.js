'use strict'
//parent is mister email but later email list? 
import emailsService from '../../services/emails-service.js'

export default {
    props: ['mail'],
    template: `
   <li class="email-preview flex">
       <div>
            <i @click.stop="toggleRead(mail.id)" v-if="mail.isRead" class="far fa-envelope-open"> </i>   
            <i @click.stop="toggleRead(mail.id)" v-else class="far fa-envelope"> </i> 
            <h3 :class="{bold: !mail.isRead}" class="preview-subject"> {{mail.subject}} </h3> 
        </div>
        <div>
            <p v-if="mail.sentAt" class="inline"> {{sentAtHour}} </p>   
    </div>    
             </li>
`,
    methods: {
        toggleRead(mailID) {
            emailsService.toggleReadStatus(mailID);
            this.$emit('setPercentage');
        }
    },
    computed: {
        sentAtHour () {
        return   this.mail.sentAt.substr(0,5)
        }
    }


}