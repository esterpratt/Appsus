'use strict';

export default {
    props: ['note'],
    template: `
            <section class="img-note-container" :style="'background-color:' + note.color">             
                <div class="note-img">
                    <img v-if="note.data.src" :src="note.data.src"/>
                    <!-- @load="$emit('setImgAttr')" -->
                </div>
                <p>{{note.data.txt}}</p>              
            </section>
    `,

    // mounted() {
    //     this.$emit('setNoteAttr')
    // }
}