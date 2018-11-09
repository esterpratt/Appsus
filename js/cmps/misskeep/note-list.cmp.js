'use strict';

import textNote from './text-note.cmp.js';
import imgNote from './img-note.cmp.js';
import todoNote from './todo-note.cmp.js';
import eventBus, { SHOW_USER_MSG } from '../../event-bus.js';

// father: miss-keep

export default {
    props: ['notes'],
    template: `
        <section class="notes-list">
            <div class="note-container" v-for="note in notes" :key="note.id">
                <div class="note" :style="'background-color:' + note.color"
                    @click="editNote(note)">
                    <i class="fas fa-thumbtack" :class="{pinned: note.isPinned}" @click.stop="$emit('pinNote', note)"></i>
                    <h3>{{note.data.title}}</h3>
                    <component :is="note.type" 
                            :note="note">
                    </component>
                    <i class="fas fa-trash-alt" @click.stop="$emit('deleteNote', note)"></i>
                </div>
            </div>
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
            this.$router.push(`/missKeep/${note.type}/${note.id}`);
        }
    }
}