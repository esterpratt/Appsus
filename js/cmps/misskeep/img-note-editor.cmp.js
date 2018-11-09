'use strict';

import keepService from '../../services/keep-service.js'
import eventBus, { SHOW_USER_MSG } from '../../event-bus.js';
import uploadService from '../../services/upload-service.js';

export default {
    props: ['data'],
    template: `
        <div class="new-img-container" :style="'background-color:'+ note.color">
            <h3>{{ this.note.id ? 'Edit' : 'Add'}} Image Note</h3>
            <form>
                <input class="new-img-input" type="text" v-model="imgSrc" placeholder="Enter Image Url"/>
                <div>
                    <button @click.prevent="addImage">Add Image</button>
                    <label for="imgData" class="upload-btn">Upload Image</label>
                </div>
            </form>
            <input type="file" name="upload" id="imgData" @change="uploadImage" style="display:none">
            <div class="img-edit-container">
                <div class="uploaded-img-container" v-if="note.data.src">
                    <img :src="note.data.src"/>
                </div>
                <div class="img-text-container">
                    <input class="note-title" type="text" v-model="note.data.title" placeholder="Title"/>
                    <textarea v-model="note.data.txt" placeholder="Add your Text"></textarea>
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
            })
            .catch(msg => {
                eventBus.$emit(SHOW_USER_MSG, { type: 'warning', txt: msg })
            });
        },

        backToList() {
            this.$router.push('/missKeep');
        },

        uploadImage(ev) {
            uploadService.handleImageFromInput(ev, this.uploadNewImg);
        },

        uploadNewImg(img) {
            this.note.data.src = img.src;
        }
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