
import router from './routes.js';
import appsusApp from './pages/appsus-app.cmp.js';
import navBar from './cmps/appsus/nav-bar.cmp.js';

new Vue({
    el: '#app',
    router,
    components: {
        appsusApp,
        navBar
    },

    created() {
        this.$router.push(`/`)
    }
})
