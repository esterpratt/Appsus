'use strict';

import keepService from '../../services/keep-service.js'

export default {
    props: ['note'],
    template: `
            <section class="text-note-container">
                <button @click="pinToTop">Pin To Top</button>
                <h3>{{note.data.title}}</h3>
                <p>{{note.data.txt}}</p>
                <button @click="editNote">Edit</button>
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
        editNote() {
            // go to note page with currNote ID
            this.$router.push(`/missKeep/textNote/${this.note.data.id}`);
        },

        pinToTop() {
            keepService.pinNoteToTop(this.note);
        }
    },

    created() {
       
    },
}