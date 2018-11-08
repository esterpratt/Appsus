'use strict';

export default {
    template: `
            <section>
                <h2>Appsus-App</h2>
                <div @click="goToMisterEmail">Mister Email</div>
                <div @click="goToMissKeep">Miss Keep</div>
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