'use strict';

import textNote from './text-note.cmp.js';
import imgNote from './img-note.cmp.js';
import todoNote from './todo-note.cmp.js';

// father: miss-keep

export default {
    props: ['notes'],
    template: `
            <section class="notes-list">
                <component class="note"
                       v-for="note in notes"
                       :is="note.type" 
                       :note="note">
                </component>
            </section>
    `,

    components: {
        textNote,
        imgNote,
        todoNote,
    },
}