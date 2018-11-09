'use strict';

import keepService from '../../services/keep-service.js'

export default {
    props: ['data'],
    template: `
        <div class="new-text-container" :style="'background-color:'+ note.color">
            <h3>{{ this.note.data.id ? 'Edit' : 'Add'}} Text Note</h3>
            <!-- <form> -->
                <input class="note-title" type="text" v-model="note.data.title" placeholder="Title"/>
                <textarea v-model="note.data.txt" placeholder="Add your text"></textarea>
                <div class="note-btns">
                    <label>
                        <i class="fas fa-palette"></i>
                        <input type="color" v-model="note.color">
                    </label>
                    <div>
                        <button class="cancel" @click="backToList">Cancel</button>
                        <button class="save" type="submit" @click="saveNote">Save Note</button>
                    </div>
                </div>
            <!-- </form> -->
        </div>
    `,
    data() {
        return {
            note: {
                type: 'textNote',
                isPinned: false,
                data: {
                    title: '',
                    txt: '',
                },
                color: "#ffda95"
            },
        }
    },
    methods: {
        saveNote(note) {
            keepService.saveNote(this.note)
            .then(note => {
                this.$router.push('/missKeep');
            });
        },

        backToList() {
            this.$router.push('/missKeep');
        },
    },

    created() {
        const noteId  = this.$route.params.noteId;
        if (noteId) {
            keepService.getNoteById(noteId)
            .then(note=>{  
                this.note = note
            })
        }
    },
}