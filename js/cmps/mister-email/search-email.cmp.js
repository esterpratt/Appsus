'use strict'
//parent is mister-email.cmp.js in pages

export default {
    template: `
    <section class="search-box">
         <form>
           <input type="text" @input="setFilter" v-model="filter" placeholder="Type here to search" />
        </form>
    </section>

    `,
    data() {
        return {
            filter: '',
        }
    },
    methods: {
        setFilter() {
            this.$emit('setFilter', this.filter);
        }
    }
};
