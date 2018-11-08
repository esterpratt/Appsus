'use strict';

export default {
    props: ['note'],
    template: `
            <section class="img-note-container">
                <button>Pin To Top</button>
                <h3>{{note.data.title}}</h3>
                <div class="note-img-container">
                    <img :src="note.data.src"/>
                </div>
                <p>{{note.data.text}}</p>
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
            this.$router.push(`/missKeep/imgNote/${this.note.data.id}`);
        },
    },

    created() {
       
    },
}