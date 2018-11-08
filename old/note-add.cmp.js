'use strict';

import textNoteEditor from '../js/cmps/misskeep/text-note-editor.cmp.js';
import imgNoteEditor from '../js/cmps/misskeep/img-note-editor.cmp.js';
import todoNoteEditor from '../js/cmps/misskeep/todo-note-editor.cmp.js';
import keepService from '../js/services/keep-service.js';


export default {
    template: `
            <section class="add-note-container">
                <!-- <component :is="currNoteEditor.type" 
                            >
                </component> -->
                <div class="note-options">
                    <button @click="setCurrNoteType('textNote')">Text</button>
                    <button @click="setCurrNoteType('imgNote')">IMG</button>
                    <button @click="setCurrNoteType('todoNote')">TODO</button>
                    <input type="color" v-model="currNote.color" @change="setNoteColor">
                    <button @click="backToList">Cancel</button>
                    <!-- <text-note-editor v-if="currNote.type === 'textNote'"
                            :data="currNote"
                            @saveNote="saveNote">
                    </text-note-editor>
                    <img-note-editor v-if="currNote.type === 'imgNote'"
                            :data="currNote"
                            @saveNote="saveNote">
                    </img-note-editor>
                    <todo-note-editor v-if="currNote.type === 'todoNote'"
                            :data="currNote"
                            @saveNote="saveNote">
                    </todo-note-editor> -->
                </div>
            </section>
    `,

    components: {
        textNoteEditor,
        imgNoteEditor,
        todoNoteEditor,

    },

    data() {
        return {
            currNote: {
                type: 'textNote',
                data: {
                    title: 'Title',
                    txt: 'Your Text'
                },
                color: '#ffffff',
            },
        }
    },

    computed: {
        
    },

    methods: {


        setCurrNoteType(noteType) {
            this.currNote.type = noteType;
        },

        setNoteColor() {
            console.log('change note color');          
        },

        saveNote(note) {
            keepService.addNote(note)
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
                this.currNote = note
            })
        }
    },
}