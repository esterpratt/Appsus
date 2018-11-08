
import router from './routes.js';
import appsusApp from './pages/appsus-app.cmp.js';

new Vue({
    el: '#app',
    router,
    components: {
        appsusApp,
    },

    created() {
        this.$router.push(`/`)
    }
})
