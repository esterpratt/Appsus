'use strict';

import keepService from '../../services/keep-service.js'

export default {
    props: ['note'],
    template: `
        <div class="notes-container">
            <section class="text-note-container" :style="'background-color:' + note.color">
                <div class="note-options">
                    <i class="fas fa-thumbtack" @click="$emit('pinNote')"></i>
                    <i class="fas fa-edit" @click="editNote"></i>
                </div>
                <h3>{{note.data.title}}</h3>
                <p>{{note.data.txt}}</p>
                <i class="fas fa-trash-alt" @click="$emit('deleteNote')"></i>
            </section>
        </div>
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

        // pinToTop() {
        //     keepService.pinNoteToTop(this.note)
        //     .then(notes => {
        //         this.$emit('updateNotes', notes);
        //     })
        // },
    },

    created() {
       
    },
}