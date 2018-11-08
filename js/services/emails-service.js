'use strict'

import utilService from './util-service.js'

var emails = [];

function initEmails() {
    createEmail('Hi Ester', 'How are you today?');
    createEmail('Hello Special Offer', '50% off on all cement');
    createEmail('Just checking in', 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ,lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum . lorem ipsum ');
    createEmail('Static and Ben El', 'Have you taken the event bus yet today?');
    console.log(emails)
}

function createEmail(subject, body) {
        emails.push({
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: '7.11.18'
    })
}

function getMails () {
    return Promise.resolve(emails)
}

initEmails()
console.log(emails)

export default {
    createEmail,
    initEmails,
    getMails,
}