'use strict'

import utilService from './util-service.js'

var emails = [];

function countReadMails () {
    return  emails.filter(mail=> mail.isRead).length / emails.length *100;
}

function initEmails() {
    createEmail('Hi Ester', 'How are you today?');
    createEmail('Hello Special Offer', '50% off on all cement hello');
    createEmail('Just checking in', 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ,lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum . lorem ipsum ');
    createEmail('Static and Ben El', 'Have you taken the event bus yet today?');
    console.log(emails)
}

function setMailRead (mailId) {
  var mailIdx =  emails.findIndex(mail => mail.id === mailId)
  emails[mailIdx].isRead = true;
}

function toggleReadStatus (mailId) {
    var mailIdx =  emails.findIndex(mail => mail.id === mailId)
    emails[mailIdx].isRead = !emails[mailIdx].isRead;
}

function getById(mailId) {
    return storageService.load(KEY)
        .then(emails => {
            return emails.find(mail => mail.id === mailId);
        })
}


function deleteMail(MailId) {
    return storageService.load(KEY)
        .then(emails => {
            var mailIdx = emails.findIndex(mail => mail.id === mailId);
            emails.splice(mailIdx, 1);
            return storageService.store(KEY, emails);
        })
}

function createEmail(subject, body) {
        emails.push({
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: moment().format('HH:mm:ss, MMM Do YYYY')
    })
}

function getMails () {
    return Promise.resolve(emails)
}

initEmails()

export default {
    createEmail,
    initEmails,
    getMails,
    setMailRead,
    toggleReadStatus,
    countReadMails,
}