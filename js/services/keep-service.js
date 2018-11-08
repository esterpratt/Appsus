'use strict';

import storageService from './storage-service.js'
import utilService from './util-service.js'

export default {
    getNotes,
    saveNote,
    getNoteById,
    pinNoteToTop,
}

const KEY = 'notesKey';

function saveNote(noteToSave) {
    if (noteToSave.data.id) {
        return getNotes()
        .then(notes => {
            // get note Index
            let noteIdx = notes.findIndex(note => note.data.id === noteToSave.data.id);
            notes.splice(noteIdx, 1, noteToSave);
            storageService.store(KEY, notes);
            return Promise.resolve(noteToSave);
        })
    } else {
        noteToSave.data.id = utilService.makeId();
        return getNotes()
        .then(notes => {
            notes.unshift(noteToSave);
            storageService.store(KEY, notes);
            return Promise.resolve(noteToSave);
        })
    }
}

function getNotes(filter = null) {
    return storageService.load(KEY)
        .then(notes => {
            if (!notes || !notes.length) {
                notes = createInitialNotes();
                storageService.store(KEY, notes);
            }
            if (filter === null) return notes;
            // else return notes.filter(note => 
            //                 note.title.toUpperCase().includes(filter.byTitle.toUpperCase()))
        })
}

function getNoteById(noteId) {
    return getNotes()
    .then(notes => {
        return notes.find(note => {
            return note.data.id === noteId;
        })
    })
}

function pinNoteToTop(noteToPin) {
    getNotes()
    .then(notes => {
        let noteIndex = notes.findIndex(note => note.data.id === noteToPin.data.id);
        console.log(noteIndex);
        
        notes.splice(noteIndex, 1);
        notes.unshift(noteToPin);
        
        // save to storage
        storageService.store(KEY, notes);
    })
}

function createInitialNotes() {
    return [{
                type: 'textNote',
                data: {
                    id: utilService.makeId(),
                    title: 'First-Text-Note',
                    txt: 'This is Your First Note!',
                },
                color: '#ffffff',
            },
            {
                type: 'imgNote',
                data: {
                    id: utilService.makeId(),
                    title: 'First-Img-Note',
                    src: '../img/try.jpg',
                    txt: 'This is Your First Img Note!',
                },
                color: '#ffffff',
            },
            {
                type: 'todoNote',
                data: {
                    id: utilService.makeId(),
                    title: 'First-TODO-Note',
                    todos: [{txt: 'finish sprint', isDone: false}, {txt: 'design', isDone: false}],
                },
                color: '#ffffff',
            },
        ]
}