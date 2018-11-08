'use strict';

// import noteAdd from './note-add.cmp.js';
import noteList from '../cmps/misskeep/note-list.cmp.js';
import keepService from '../services/keep-service.js';

export default {
    template: `
            <section class="missKeep-container">
                <h2>Miss Keep App</h2>
                <input placeholder="Search"/>
                <div class="add-note-btns">
                    <p>Add Note:</p>
                    <button @click="addTextNote">Text</button>
                    <button @click="addImgNote">IMG</button>
                    <button @click="addTodoNote">TODO</button>
                </div>
                <note-list v-if="notes" :notes="notes"></note-list>
            </section>
    `,

    components: {
        // noteAdd,
        noteList,
    },

    data() {
        return {
            // noteData: null,
            notes: null,
        }
    },

    computed: {

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
        // addNote() {
        //     this.$router.push('/missKeep/note');
        // },
        // addNote(note) {
        //     this.notes.unshift(note);
        //     console.log(this.notes);

        // }
    },

    created() {
        keepService.getNotes()
            .then(notes => {
                this.notes = notes;
            })
    },
}