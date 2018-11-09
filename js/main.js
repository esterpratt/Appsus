
import router from './routes.js';
import appsusApp from './pages/appsus-app.cmp.js';
import navBar from './cmps/appsus/nav-bar.cmp.js';
import userMsg from './cmps/appsus/user-msg.cmp.js';

new Vue({
    el: '#app',
    router,
    components: {
        appsusApp,
        navBar,
        userMsg
    },

    created() {
        this.$router.push(`/`)
    }
})
