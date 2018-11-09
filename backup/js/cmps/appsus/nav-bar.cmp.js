'use strict'

export default {
    template: `
        <section>
            <button class="nav-btn" @click="toggleNavbar">☰</button>
            <nav :class="{open: isOpen}">
                <button @click="toggleNavbar">X</button>
                <router-link class="router-link" exact to="/">Home</router-link> 
                <router-link class="router-link" to="/misterEmail">Mister Email</router-link>
                <router-link class="router-link" to="/missKeep">Miss Keep</router-link>
            </nav>
        </section>
    `,

    data() {
        return {
            isOpen: false,
        }
    },

    computed:{
        sign() {
            if (this.isOpen) return 'x';
            else return '☰';
        }
    },

    methods: {
        toggleNavbar() {
            this.isOpen = !this.isOpen;
        }
    },
}