'use strict';

export default {
    props: ['note'],
    template: `
            <section>         
                <div class="todos-container">
                    <div v-for="todo in note.data.todos">
                        <i class="fas fa-check" v-if="todo.isDone"></i>
                        <i class="fas fa-circle" v-else></i>
                        <span :class="{done: todo.isDone}">{{todo.txt}}</span>
                    </div>
                </div>            
            </section>
    `,
}