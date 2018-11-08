'use strict';

import appsusApp from './pages/appsus-app.cmp.js'
import misterEmail from './pages/mister-email.cmp.js'
import missKeep from './pages/miss-keep.cmp.js'
import textNoteEditor from './cmps/misskeep/text-note-editor.cmp.js'
import imgNoteEditor from './cmps/misskeep/img-note-editor.cmp.js'
import todoNoteEditor from './cmps/misskeep/todo-note-editor.cmp.js'

var routes = [
    {path: '/', component: appsusApp},
    {path: '/misterEmail', component: misterEmail},
    {path: '/missKeep', component: missKeep},
    {path: '/missKeep/textNote', component: textNoteEditor},
    {path: '/missKeep/imgNote', component: imgNoteEditor},
    {path: '/missKeep/todoNote', component: todoNoteEditor},
    {path: '/missKeep/textNote/:noteId', component: textNoteEditor},
    {path: '/missKeep/imgNote/:noteId', component: imgNoteEditor},
    {path: '/missKeep/todoNote/:noteId', component: todoNoteEditor},
]

Vue.use(VueRouter);
var myRouter = new VueRouter({routes})

export default myRouter;