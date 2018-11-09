'use strict';

// import noteAdd from './note-add.cmp.js';
import noteList from '../cmps/misskeep/note-list.cmp.js';
import keepService from '../services/keep-service.js';

export default {
    template: `
            <section class="missKeep-container">
                <div class="add-note-btns">
                    <!-- <p>Add Note:</p> -->
                    <button @click="addTextNote">New Text</button>
                    <button @click="addImgNote">New Image</button>
                    <button @click="addTodoNote">New Todos</button>
                </div>
                <input placeholder="Search Note" v-model="filter" @input="loadNotes"/>
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