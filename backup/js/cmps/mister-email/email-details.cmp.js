'use strict'
//parent is mister-email.cmp.js in pages

export default {
    props: ['mailtodisplay'],
    template: `
    <section class="email-details">
        <h3 class="details-subject"> {{mailtodisplay.subject}} </h3> 
        <p class="details-body"> {{mailtodisplay.body}} </p>
    </section>
    `,
    created() {
        console.log(this.mailtodisplay)
    }
}

