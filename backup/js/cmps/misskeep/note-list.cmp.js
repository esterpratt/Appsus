'use strict';

import textNote from './text-note.cmp.js';
import imgNote from './img-note.cmp.js';
import todoNote from './todo-note.cmp.js';

// father: miss-keep

export default {
    props: ['notes'],
    template: `
            <section class="notes-list">
                <component class="note"
                        v-for="note in notes" :key="note.id"
                        :is="note.type" 
                        :note="note"
                        @deleteNote="$emit('deleteNote', note)"
                        @pinNote="$emit('pinNote', note)"
                        @click.native="editNote(note)">
                </component>
            </section>
    `,

    components: {
        textNote,
        imgNote,
        todoNote,
    },

    data() {
        return {
            
        }
    },

    methods: {
        editNote(note) {
            this.$router.push(`/missKeep/${note.type}/${note.data.id}`);
        }
    }
}