'use strict';

import noteList from '../cmps/misskeep/note-list.cmp.js';
import keepService from '../services/keep-service.js';

export default {
    template: `
            <section class="missKeep-container">
                <div class="add-note-btns">
                    <button @click="addTextNote">New Text</button>
                    <button @click="addImgNote">New Image</button>
                    <button @click="addTodoNote">New Todos</button>
                </div>
                <input placeholder="Search Note" v-model="filter" @input="loadNotes"/>
                <p v-if="notes && pinnedNotes.length">pinned:</p>
                <note-list v-if="notes" :notes="pinnedNotes" 
                    @deleteNote="deleteNote" @pinNote="pinNote">
                </note-list>
                <p v-if="notes && unpinnedNotes.length">{{pinnedNotes.length ? 'others:' : 'notes:'}}</p>
                <note-list v-if="notes" :notes="unpinnedNotes" 
                    @deleteNote="deleteNote" @pinNote="pinNote"
                    @dropNote="dropNote">
                </note-list>
            </section>
    `,

    components: {
        noteList,
    },

    data() {
        return {
            filter: null,
            notes: null,
        }
    },

    computed: {
        pinnedNotes() {
            return this.notes.filter(note => note.isPinned);
        },

        unpinnedNotes() {
            return this.notes.filter(note => !note.isPinned);
        }
    },

    methods: {
        addTextNote() {
            this.$router.push('/missKeep/textNote');
        },

        addImgNote() {
            this.$router.push('/missKeep/imgNote');
        },

        addTodoNote() {
            this.$router.push('/missKeep/todoNote');
        },

        deleteNote(note) {
            swal({
                title: "Are you sure?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        swal("Note has been deleted!", {
                            icon: "success",
                        });
                        keepService.deleteNote(note)
                            .then(res => {
                                keepService.getNotes()
                                    .then(notes => {
                                        this.notes = notes;
                                    })
                            })
                    } else {
                        swal("OK, note won't be deleted");
                    }
                });
        },

        pinNote(note) {
            keepService.pinNote(note)
                .then(res => {
                    keepService.getNotes()
                        .then(notes => {
                            this.notes = notes;
                        })
                })
        },

        dropNote(note, ev) {
            let x = ev.clientX;
            let y = ev.clientY;
            let idx;
            // check if dragged on other note
            for (let i = 0; i < this.notes.length; i++) {
                if (x > this.notes[i].left && y > this.notes[i].top
                    && y < this.notes[i].top + this.notes[i].height
                    && x < this.notes[i].left + this.notes[i].width) {
                    idx = i;
                }
            }

            console.log(idx);
            
            
            if (idx !== undefined) {
                keepService.changeNotePos(note, idx)
                .then(res => {
                    keepService.getNotes()
                    .then(notes => {
                        this.notes = notes;
                        console.log(this.notes, idx, x, y);
                        })
                })
            }
        },

        loadNotes() {
            keepService.getNotes(this.filter)
                .then(notes => {
                    this.notes = notes;
                })
        }
    },

    created() {
        this.loadNotes();
    },
}