'use strict';

import keepService from '../../services/keep-service.js'

export default {
    props: ['data'],
    template: `
        <div class="new-img-container">
            <h3>Add Image Note</h3>
            <form>
                <label>
                    <input type="text" v-model="imgSrc" placeholder="Enter Image Url"/>
                </label>
                <button @click.prevent="addImage">Add Image</button>
            </form>
            <div class="uploaded-img-container" v-if="note.data.src">
                <img :src="note.data.src"/>
            </div>
            <div class="img-text-container">
                <input class="note-title" type="text" v-model="note.data.title" placeholder="Title"/>
                <textarea v-model="note.data.txt" rows="4" placeholder="Add your Text"></textarea>
            </div>
            <div class="note-btns">
                <input type="color" v-model="note.data.color" @change="setNoteColor">
                <div>
                    <button class="cancel" @click="backToList">Cancel</button>
                    <button class="save" type="submit" @click="saveNote">Save Note</button>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            imgSrc: '',
            note: {
                type: 'imgNote',
                data: {
                    title: '',
                    txt: '',
                    src: '',
                },
                color: "#ffffff"
            },
        }
    },
    methods: {
        setNoteColor() {
            console.log('change note color');          
        },
        addImage() {
            this.note.data.src = this.imgSrc;

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