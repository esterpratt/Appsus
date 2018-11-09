'use strict';

export default {
    props: ['note'],
    template: `
            <section class="text-note-container">
                <p>{{note.data.txt}}</p>
            </section>
    `,
}