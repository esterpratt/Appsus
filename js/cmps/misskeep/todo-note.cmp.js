'use strict';

// father: note-list

export default {
    props: ['note'],
    template: `
            <section class="todo-note-container">
                <button>Pin To Top</button>
                <h3>{{note.data.title}}</h3>
                <div class="todos-container">
                    <div v-for="todo in note.data.todos">
                        <span>*</span>{{todo.txt}}
                    </div>
                </div>
                <button @click="editNote">Edit</button>
            </section>
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
        }
    },

    created() {
       
    },
}