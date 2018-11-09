'use strict';

import keepService from '../../services/keep-service.js'

export default {
    props: ['data'],
    template: `
        <div class="new-img-container" :style="'background-color:'+ note.color">
            <h3>Add Image Note</h3>
            <form>
                <input class="new-img-input" type="text" v-model="imgSrc" placeholder="Enter Image Url"/>
                <!-- <i class="fas fa-plus" @click.prevent="addImage"></i> -->
                <button @click.prevent="addImage">Add Image</button>
            </form>
            <div class="img-edit-container">
                <div class="uploaded-img-container" v-if="note.data.src">
                    <img :src="note.data.src"/>
                </div>
                <div class="img-text-container">
                    <input class="note-title" type="text" v-model="note.data.title" placeholder="Title"/>
                    <textarea v-model="note.data.txt" rows="4" placeholder="Add your Text"></textarea>
                </div>
            </div>
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
        </div>
    `,
    data() {
        return {
            imgSrc: '',
            note: {
                type: 'imgNote',
                isPinned: false,
                data: {
                    title: '',
                    txt: '',
                    src: '',
                },
                color: '#ffda95',
            },
        }
    },
    methods: {
        addImage() {
            this.note.data.src = this.imgSrc;
            this.imgSrc = '';
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
}