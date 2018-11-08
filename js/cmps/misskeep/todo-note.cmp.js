'use strict';

import keepService from '../../services/keep-service.js'

export default {
    props: ['note'],
    template: `
        <div class="notes-container">
            <section class="todo-note-container" :style="'background-color:' + note.color">         
                <div class="note-options">
                    <i class="fas fa-thumbtack" @click="$emit('pinNote')"></i>
                    <i class="fas fa-edit" @click="editNote"></i>
                </div>
                <h3>{{note.data.title}}</h3>
                <div class="todos-container">
                    <div v-for="todo in note.data.todos">
                    <i class="fas fa-check" v-if="todo.isDone"></i>
                    <i class="fas fa-circle" v-else></i>
                    <span :class="{done: todo.isDone}">{{todo.txt}}</span>
                    </div>
                </div>
                <i class="fas fa-trash-alt" @click="$emit('deleteNote')"></i>             
            </section>
            </div>
    `,

    components: {

    },

    data() {
        return {
        }
    },

    computed: {
        
    },

    methods: {
        editNote() {
            // go to note page with currNote ID
            this.$router.push(`/missKeep/todoNote/${this.note.data.id}`);
        },

        // pinToTop() {
        //     keepService.pinNoteToTop(this.note)
        //     .then(notes => {
        //         this.$emit('updateNotes', notes);
        //     })
        // },

        // deleteNote() {
        //     keepService.deleteNote(this.note)
        //     .then(notes => {
        //         this.$emit('updateNotes', notes);
        //     })
        // },
    },

    created() {
       
    },
}