'use strict';

// import noteAdd from './note-add.cmp.js';
import noteList from '../cmps/misskeep/note-list.cmp.js';
import keepService from '../services/keep-service.js';

export default {
    template: `
            <section class="missKeep-container">
                <h2>Miss Keep App</h2>
                <div class="add-note-btns">
                    <p>Add Note:</p>
                    <button @click="addTextNote">Text</button>
                    <button @click="addImgNote">IMAGE</button>
                    <button @click="addTodoNote">TODOS</button>
                </div>
                <input placeholder="Search" v-model="filter" @input="loadNotes"/>
                <p v-if="notes && pinnedNotes.length">pinned:</p>
                <note-list v-if="notes" :notes="pinnedNotes" 
                    @deleteNote="deleteNote" @pinNote="pinNote">
                </note-list>
                <p v-if="notes && unpinnedNotes.length">{{pinnedNotes.length ? 'others:' : 'notes:'}}</p>
                <note-list v-if="notes" :notes="unpinnedNotes" 
                    @deleteNote="deleteNote" @pinNote="pinNote">
                </note-list>
            </section>
    `,

    components: {
        // noteAdd,
        noteList,
    },

    data() {
        return {
            filter: null,
            notes: null,
        }
    },

    computed: {
        pinnedNotes() {
            return this.notes.filter(note => note.isPinned);
        },

        unpinnedNotes() {
            return this.notes.filter(note => !note.isPinned);
        }
    },

    methods: {
        addTextNote() {
            this.$router.push('/missKeep/textNote');
        },

        addImgNote() {
            this.$router.push('/missKeep/imgNote');
        },

        addTodoNote() {
            this.$router.push('/missKeep/todoNote');
        },

        deleteNote(note) {
            keepService.deleteNote(note)
            .then(res => {
                keepService.getNotes()
                .then(notes => {
                    this.notes = notes;
                })
            })        
        },

        pinNote(note) {
            keepService.pinNote(note)
            .then(res => {
                keepService.getNotes()
                .then(notes => {
                    this.notes = notes;
                })
            })
        },

        loadNotes() {
            keepService.getNotes(this.filter)
                .then(notes => {
                    this.notes = notes;
                })
        }
    },

    created() {
        this.loadNotes();
    },
}