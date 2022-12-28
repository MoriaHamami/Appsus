// import { utilService } from '../../../services/util.service'
import { storageService } from '../../../services/async-storage.service'

const MAIL_KEY = 'mailDB'
const USER_KEY = 'mailUserDB'

_createLoggedUser
_createMails

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultCriteria,
    getNearbyMailIds
}

function query(filterBy = getDefaultCriteria()) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regex.test(mail.to) || regex.test(mail.from) || regex.test(mail.body) || regex.test(mail.subject))
            }
            if (filterBy.status) {
                // Check if every status in the filter appears in each mail 
                mails = mails.filter(mail => filterBy.status.every(currStat => mail.status.includes(currStat)))
            }
            if (filterBy.isRead) {
                mails = mails.filter(mail => mail.isRead === filterBy.isRead)
            }
            if (filterBy.isStarred) {
                mails = mails.filter(mail => mail.isStarred === filterBy.isStarred)
            }
            if (filterBy.labels) {
                // Check if some (or any) of the filter labels included in each mail
                mails = mails.filter(mail => filterBy.labels.some(currLabel => mail.labels.includes(currLabel)))
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)

}

function getNearbyMailIds(mailId) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            var idx = mails.findIndex(mail => mail.id === mailId)

            let nextIdx = mails[idx].id
            let prevIdx = mails[idx].id
            if (mails.length <= 1) return ({ nextMailId: mails[nextIdx].id, prevMailId: mails[prevIdx].id })

            if (idx === mails.length - 1) nextIdx = 0
            else nextIdx = idx + 1
            if (idx === 0) prevIdx = mails.length - 1
            else prevIdx = idx - 1

            return ({ nextMailId: mails[nextIdx].id, prevMailId: mails[prevIdx].id })
        })
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function _createLoggedUser() {
    let loggedInUser = storageService.loadFromStorage(USER_KEY)
    if (!loggedInUser) {
        loggedInUser = {
            fullname: 'Mahatma Appsus',
            mail: 'user@appsus.com'
        }
        storageService.saveToStorage(USER_KEY, loggedInUser)
    }
}

function _createMails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(getEmptyMail(
            '',
            'Miss you!',
            'Would love to catch up sometimes',
            false,
            1551133930594,
            'momo@momo.com',
            'momo@momo.com',
            ['inbox', 'sent'],
            false,
            ['important']
        ))
        storageService.saveToStorage(MAIL_KEY, mails)
    }
}

function getEmptyMail(id = '', subject = '', body = '', isRead = false, sentAt = '', to = '', from = '', status = [], isStarred = false, labels = []) {
    return {
        id,
        subject,
        body,
        isRead,
        sentAt,
        to,
        from,
        status,
        isStarred,
        labels
    }
}

function getDefaultCriteria() {
    return {
        status: 'inbox',
        txt: '',
        isRead: '',
        isStarred: '',
        labels: []
    }
}






