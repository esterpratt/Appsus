'use strict';

import keepService from '../../services/keep-service.js'

export default {
    props: ['data'],
    template: `
        <div class="new-text-container">
            <h3>Add Text Note</h3>
            <!-- <form> -->
                <input class="note-title" type="text" v-model="note.data.title"/>
                <textarea v-model="note.data.txt"></textarea>
                <div class="note-btns">
                    <input type="color" v-model="note.data.color" @change="setNoteColor">
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
                data: {
                    title: '',
                    txt: '',
                },
                color: "#ffffff"
            },
        }
    },
    methods: {
        setNoteColor() {
            console.log('change note color');          
        },
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

    // created() {
    //     this.note = this.data;
    // }
}