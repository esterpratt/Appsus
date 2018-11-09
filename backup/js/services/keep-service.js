'use strict';

import storageService from './storage-service.js'
import utilService from './util-service.js'

export default {
    getNotes,
    saveNote,
    getNoteById,
    pinNote,
    deleteNote,
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
            if (filter === null || filter === '') return notes;
            return notes.filter(note => {
                let txtToSearch = [];
                if (note.data.txt) txtToSearch = [note.data.txt];
                else if (note.data.todos) txtToSearch = note.data.todos.map(todo => todo.txt);
                return note.data.title.toUpperCase().includes(filter.toUpperCase()) || txtToSearch.findIndex(txt => txt.toUpperCase().includes(filter.toUpperCase())) !== -1;
            })
            
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

function pinNote(noteToPin) {
    return getNotes()
    .then(notes => {
        // search note      
        let noteIdx = notes.findIndex(note => note.data.id === noteToPin.data.id);
        notes[noteIdx].isPinned = !notes[noteIdx].isPinned;

        // go back to top of list
        if(!notes[noteIdx].isPinned) {
            let note = notes[noteIdx];
            notes.splice(noteIdx, 1);
            notes.unshift(note);
        }

        // save to storage
        return storageService.store(KEY, notes);
    })
}

function deleteNote(noteToDelete) {
    return getNotes()
    .then(notes => {
        let noteIndex = notes.findIndex(note => note.data.id === noteToDelete.data.id);
        notes.splice(noteIndex, 1);
        // save to storage
        return storageService.store(KEY, notes);
    })
}

function createInitialNotes() {
    return [{
                type: 'textNote',
                isPinned: false,
                data: {
                    id: utilService.makeId(),
                    title: 'First-Text-Note',
                    txt: 'This is Your First Note!',
                },
                color: "#ffda95",
            },
            {
                type: 'imgNote',
                isPinned: false,
                data: {
                    id: utilService.makeId(),
                    title: 'First-Img-Note',
                    src: '../img/try.jpg',
                    txt: 'This is Your First Img Note!',
                },
                color: "#ffda95",
            },
            {
                type: 'todoNote',
                isPinned: false,
                data: {
                    id: utilService.makeId(),
                    title: 'First-TODO-Note',
                    todos: [{txt: 'finish sprint', isDone: false}, {txt: 'design', isDone: false}],
                },
                color: "#ffda95",
            },
        ]
}