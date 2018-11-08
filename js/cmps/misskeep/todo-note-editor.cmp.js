'use strict';

import keepService from '../../services/keep-service.js'

export default {
    // props: ['data'],
    template: `
        <div class="new-todo-container">
            <h3>Add TODOS Note</h3>    
            <input class="note-title" type="text" v-model="note.data.title" placeholder="Title"/>
            <ul class="todos-container">
                <li v-for="(todo, idx) in note.data.todos">
                    <div class="todo-container">
                        <label class="checkbox-container">
                            <input type="checkbox" @click="toggleTodoStatus(idx)">
                            <span class="checkmark"></span>
                        </label>
                        <!-- <input type="checkbox" @click="toggleTodoStatus(idx)" class="done-todo-checkbox"> -->
                        <div :class="{done: todo.isDone}">
                            {{todo.txt}}
                        </div>
                    </div>
                    <!-- <button >{{todo.isDone ? 'Not Done' : 'Done'}}</button> -->
                    <button @click="deleteTodo(idx)" class="delete-todo">X</button>
                </li>
            </ul>
            <form>
                <label>
                    <input type="text" class="new-todo-input" v-model="newTodo" placeholder="Add TODO"/>
                </label>
                <button @click.prevent="addTodo">Add Todo</button>
            </form>
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
            currTodo: null,
            newTodo: '',
            note: {
                type: 'todoNote',
                data: {
                    title: '',
                    todos: [],
                },
                color: "#ffffff"
            },
        }
    },

    computed: {
        
    },

    methods: {
        setNoteColor() {
            console.log('change note color');          
        },
        addTodo() {
            this.note.data.todos.push({ txt: this.newTodo, isDone: false });
            this.newTodo = '';
        },

        toggleTodoStatus(todoIdx) {
            this.note.data.todos[todoIdx].isDone = !this.note.data.todos[todoIdx].isDone;
        },

        deleteTodo(todoIdx) {
            this.note.data.todos.splice(todoIdx, 1);
        },

        // saveNote() {
        //     this.$emit('saveNote', this.note);
        // },

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