// import { utilService } from '../../../services/util.service'
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
import { criteriaService } from './criteria.service.js'

const MAIL_KEY = 'mailDB'

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getNearbyMailIds,
    getUnreadMails,
    sortMail
}

function query(filterBy = criteriaService.getDefaultCriteria()) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regex.test(mail.to) || regex.test(mail.from) || regex.test(mail.body) || regex.test(mail.subject))
            }
            if (filterBy.status) {
                mails = mails.filter(mail => mail.status.includes(filterBy.status))
            }
            if (filterBy.isRead !== '') {
                mails = mails.filter(mail => mail.isRead === filterBy.isRead)
            }
            if (filterBy.isStarred) {
                mails = mails.filter(mail => mail.isStarred === filterBy.isStarred)
            }
            if (filterBy.labels.length) {
                // Check if some (or any) of the filter labels included in each mail
                mails = mails.filter(mail => filterBy.labels.some(currLabel => mail.labels.includes(currLabel)))
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
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


function getUnreadMails(criteria, val) {
    const filterBy = {
        [`${criteria}`]: val,
        labels: '',
        isRead: false
    }
    return query(filterBy)
    // return query({ isRead: false, labels: '' }).then((mails) => {
    //     var inbox = mails
    //     query({ isStarred: false, labels: '' }).then((mails) => {
    //         var starred = mails
    //         query({ status: 'sent', labels: '' }).then((mails) => {
    //             var sent = mails
    //             query({ status: 'draft', labels: '' }).then((mails) => {
    //                 var draft = mails
    //                 return {
    //                     inbox,
    //                     starred,
    //                     sent,
    //                     draft
    //                 }
    //             })
    //         })
    //     })
    // })
    // return Promise.resolve()
    // return Promise.resolve({ 
    //     inbox: query({isRead: false, labels: ''}),
    //     starred: query({isStarred: false, labels: ''}),
    //     sent: query({status: 'sent', labels: ''}),
    //     draft: query({status: 'draft', labels: ''})
    // })

}

function sortMail(sortBy, change) {
    return query().then(mails => {
        if (sortBy === 'sentAt') {
            mails.sort(function (mail1, mail2) {
                return (mail1[`${sortBy}`] - mail2[`${sortBy}`]) * change
            })
        }
        if (sortBy === 'subject') {
            mails.sort(function (mail1, mail2) {
                const a = mail1[`${sortBy}`].toLowerCase()
                const b = mail2[`${sortBy}`].toLowerCase()
                //     if (a < b) {
                //         return -1
                //     }
                //     if (a > b) {
                //         return 1
                //     }
                //     return 0
                // })
                return a.localeCompare(b) * change
            })

        }
        console.log('mails from service:', mails)
        console.log('sortBy:', sortBy)

        return mails
    })
}
// function saveMail(mailId, mailToSave) {
//     const mails = loadFromStorage(MAIL_KEY)
//     const mail = mails.find((mail) => mail.id === mailId)
//     const review = _createMail(mailToSave)
//     mail.reviews.unshift(review)
//     _saveBooksToStorage(mails)
//     return Promise.resolve(review)
// }

// function removeMail(mailId, reviewId) {
//     let mails = _loadBooksFromStorage()
//     let mail = mails.find((mail) => mail.id === mailId)
//     const newMails = mail.reviews.filter((review) => review.id !== reviewId)
//     mail.reviews = newMails
//     _saveBooksToStorage(mails)
//     return Promise.resolve()
// }

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

function _createMails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(getEmptyMail(
            utilService.makeId(),
            'Miss you!',
            'Would love to catch up sometimes',
            false,
            1551133930594,
            null,
            'momo@momo.com',
            'momo@momo.com',
            ['inbox', 'sent'],
            false,
            ['important']
        ))
        mails.push(getEmptyMail(
            utilService.makeId(),
            'Another one!',
            'I dont like the way you eat',
            true,
            Date.now(),
            null,
            'bir@momo.com',
            'gal@momo.com',
            ['inbox'],
            true,
            ['important', 'lovable']
        ))
        console.log('mails:', mails)
        storageService.saveToStorage(MAIL_KEY, mails)
    }
}

function getEmptyMail(id = '', subject = '', body = '', isRead = false, sentAt = '', removedAt = '', to = '', from = '', status = '', isStarred = false, labels = []) {
    return {
        id,
        subject,
        body,
        isRead,
        sentAt,
        removedAt,
        to,
        from,
        status,
        isStarred,
        labels
    }
}








