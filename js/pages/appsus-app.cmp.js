'use strict';

export default {
    template: `
            <section class="appsus-container">
                <div @click="goToMisterEmail">
                    <p>Mister Email</p>
                    <img src="../../img/misteremail.png"/>
                </div>
                <div @click="goToMissKeep">
                    <p>Miss Keep</p>
                    <img src="../../img/misskeep.png"/>
                </div>
            </section>
    `,

    components: {
        
    },

    data() {
        return {
            
        }
    },

    computed: {
        
    },

    methods: {
        goToMisterEmail() {
            this.$router.push('/misterEmail');
        },

        goToMissKeep() {
            this.$router.push('/missKeep');
        },

    },

    created() {
       
    },
}