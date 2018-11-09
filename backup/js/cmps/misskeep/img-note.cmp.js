'use strict';

export default {
    props: ['note'],
    template: `
        <div class="notes-container">
            <section class="img-note-container" :style="'background-color:' + note.color">
                <i class="fas fa-thumbtack" :class="pinnedStatus" @click.stop="$emit('pinNote')"></i>
                <div class="note-options">
                    <!-- <i class="fas fa-edit" @click="editNote"></i> -->
                </div>
                <h3>{{note.data.title}}</h3>
                <div class="note-img-container">
                    <img v-if="note.data.src" :src="note.data.src"/>
                </div>
                <p>{{note.data.txt}}</p>
                <i class="fas fa-trash-alt" @click.stop="$emit('deleteNote')"></i>
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
        pinnedStatus() {
            return {
                'pinned': this.note.isPinned,
            }
        }
    },

    methods: {
        // editNote() {
        //     // go to note page with currNote ID
        //     this.$router.push(`/missKeep/imgNote/${this.note.data.id}`);
        // },
    },

    created() {
       
    },
}