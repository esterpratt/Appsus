'use strict';

import textNote from './text-note.cmp.js';
import imgNote from './img-note.cmp.js';
import todoNote from './todo-note.cmp.js';
import storageService from '../../services/storage-service.js';
// import eventBus, { SHOW_USER_MSG } from '../../event-bus.js';

// father: miss-keep

export default {
    props: ['notes'],
    template: `
        <section class="notes-list" ref="notes" @mouseup="dropNote">
            <div class="note-container" v-for="(note, idx) in notes" :key="note.id">
                <div :ref="idx" class="note" :style="'background-color:' + note.color"
                    @mousedown="drag(note)" @click="editNote(note)">
                    <i class="fas fa-thumbtack" :class="{pinned: note.isPinned}" @click.stop="$emit('pinNote', note)"></i>
                    <h3>{{note.data.title}}</h3>
                    <component :is="note.type" 
                            :note="note">
                            <!-- @setImgAttr="setImgAttr(note, idx)" -->
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
            draggedNote: null,
        }
    },

    methods: {
        editNote(note) {
            this.$router.push(`/missKeep/${note.type}/${note.id}`);
        },

        drag(note) {
            this.draggedNote = note;
            this.$refs.notes.addEventListener('mousemove', this.updateMousePos);
        },

        dropNote(ev) {
            if (this.draggedNote) {
                this.$emit('dropNote', this.draggedNote, ev);
                this.draggedNote = null;
                this.$refs.notes.removeEventListener('mousemove', this.updateMousePos);
            }
        },

        updateMousePos(ev) {
            let x = ev.clientX;
            let y = ev.clientY;       
        },

        // timeout instead of mounted, couldn't find how to get to mounted with watch.
        // also TODO: save height of el, need to check if more than height
        // and not put it before if el is moved ahead.
        // also TODO: drag. copy to notes-list of pinned notes
        setAttrOfNotesTime() {
            setTimeout(this.setAttrOfNotes, 500);
        },

        setAttrOfNotes() {
            // why notes change when edit/add a note?
            // anyway, this solve the problem of trying to get to unexisting ELs
            if (this.$route.path === '/missKeep') {
                this.notes.forEach((note, idx) => {
                    note.top = this.$refs[idx][0].offsetTop;
                    note.left = this.$refs[idx][0].offsetLeft;
                    note.height = this.$refs[idx][0].clientHeight;
                    note.width = this.$refs[idx][0].clientWidth;
                });

                storageService.store('notesKey', this.notes);
            }
        },
    },

    mounted() {
        this.setAttrOfNotes();
    },

    watch: {
        'notes': function () {
            this.setAttrOfNotesTime();
        }
    }
}