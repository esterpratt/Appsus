'use strict'

//parent is mister-email.cmp.js in pages
//should import from new cmp - email preview. not built yet. it will give li 

export default {
    props: ['emails'],

    template: `
    <section class="email-list-section"> 
        <p> email list </p>
        <ul>
             <li class="email-entity" v-for="mail in emails">
             <!-- <email-preview v-for="" > </email-preview> -->
                    <h1> {{mail.subject}} </h1>        
                   <div> {{mail.body}} </div>
             </li>
      </ul>
    </section>
    `,

    created() {
        console.log('list created')
    }


}