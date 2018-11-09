import eventBus, { SHOW_USER_MSG } from '../../event-bus.js'

export default {
    template: `
        <section class="user-msg" :class="msg.type" v-if="msg">
            <i class="far fa-times-circle" @click="removeMsg"></i>
            <p>{{msg.txt}}</p>
            <router-link v-if="msg.link" :to="msg.link">Check it Out</router-link>
        </section>  
    `,
    data() {
        return {
            msg: null
        }
    },

    methods: {
        removeMsg() {
            this.msg = null;
        }
    },

    created() {
        eventBus.$on(SHOW_USER_MSG, msg => {
            this.msg = msg;
            let delay = 3000;
            setTimeout(() => {
                this.msg = null;
            }, delay)
        })
    }
}