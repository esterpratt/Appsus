'use strict';

import keepService from '../../services/keep-service.js'
import eventBus, { SHOW_USER_MSG } from '../../event-bus.js';

export default {
    template: `
        <div class="new-todo-container" :style="'background-color:'+ note.color">
            <h3>{{ this.note.id ? 'Edit' : 'Add'}} TODOS Note</h3>    
            <input class="note-title" type="text" v-model="note.data.title" placeholder="Title"/>
            <form @submit.prevent="addTodo">
                <label>
                    <input type="text" class="new-todo-input" v-model="newTodo" placeholder="Add TODO"/>
                </label>
                <button class="button-none">
                    <i class="fas fa-plus"></i>
                </button>
            </form>
            <ul class="todos-editor-container">
                <li v-for="(todo, idx) in note.data.todos">
                    <label class="checkbox-container">
                        <input type="checkbox" v-model="todo.isDone">
                        <span class="checkmark"></span>
                    </label>
                    <p :class="{done: todo.isDone}">
                        {{todo.txt}}
                    </p>
                    <i class="far fa-times-circle delete-todo" @click="deleteTodo(idx)"></i>
                </li>
            </ul>
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
            currTodo: null,
            newTodo: '',
            note: {
                type: 'todoNote',
                isPinned: false,
                data: {
                    title: '',
                    todos: [],
                },
                color: "#ffda95"
            },
        }
    },

    computed: {
        
    },

    methods: {
        addTodo() {
            if( this.newTodo !== '') {
                this.note.data.todos.push({ txt: this.newTodo, isDone: false });
                this.newTodo = '';
            }
        },

        deleteTodo(todoIdx) {
            this.note.data.todos.splice(todoIdx, 1);
        },

        saveNote() {
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