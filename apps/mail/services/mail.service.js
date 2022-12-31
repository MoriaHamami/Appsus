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
    sortMail,
    put
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
        console.log('updating:', mail)
        return storageService.put(MAIL_KEY, mail)
    } else {
        console.log('creating:', mail)
        return storageService.post(MAIL_KEY, mail)
    }
}

function put(mail) {
    return storageService.put(MAIL_KEY, mail)
}

function _createMails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(getEmptyMail(
            utilService.makeId(),
            'You are annoying',
            'I dont like the way you eat',
            true,
            Date.now(),
            null,
            'bir@momo.com',
            'user@appsus.com',
            ['sent'],
            true,
            ['important', 'lovable']
        ))
        mails.push(getEmptyMail(
            utilService.makeId(),
            'No need for therapy',
            'Happy Birthday to my one and only true best pal. What would I do without you? Without our conversations, I bet my therapy bills would be outrageous.',
            true,
            1672510386536,
            null,
            'user@appsus.com',
            'bestie@momo.com',
            ['inbox'],
            false,
            ['important', 'lovable']
        ))
        mails.push(getEmptyMail(
            utilService.makeId(),
            'Let\'s go shopping',
            'Sometimes I wonder how you put up with me, then I remember, oh! I put up with you! So we are even.',
            true,
            1672510287536,
            null,
            'user@appsus.com',
            'gal@pal.com',
            ['inbox'],
            true,
            ['important', 'lovable']
        ))
        mails.push(getEmptyMail(
            utilService.makeId(),
            'To my bestie!',
            'Dear besty, if you get the answer to this, then lunch is on me. What is the tallest building in the entire world?... It must be the library because it has so many stories!',
            false,
            1674510187536,
            null,
            'user@appsus.com',
            'momo@momo.com',
            ['inbox'],
            false,
            ['important', 'lovable']
        ))
        mails.push(getEmptyMail(
            utilService.makeId(),
            'Hey there honey',
            'I think you are an interior decorator. Do you know why? Because when you walked in class that day, the room was suddenly beautiful and perfect!',
            false,
            1622510387536,
            null,
            'user@appsus.com',
            'old@man.com',
            ['inbox'],
            false,
            ['important', 'lovable']
        ))
        mails.push(getEmptyMail(
            utilService.makeId(),
            'My dog died',
            'Hey pal, what name would you call a dog that has no both legs?...well it does not matter what name you might call him, trust me he is not coming!',
            false,
            1551433950594,
            null,
            'user@appsus.com',
            'gal@momo.com',
            ['inbox'],
            false,
            ['important', 'lovable']
        ))
        mails.push(getEmptyMail(
            utilService.makeId(),
            'Miss you!',
            'Would love to catch up sometimes',
            false,
            1551133930594,
            null,
            'user@appsus.com',
            'user@appsus.com',
            ['inbox', 'sent'],
            false,
            ['important']
        ))
        mails.push(getEmptyMail(
            utilService.makeId(),
            'We are better than them',
            'If you feel down, like the world is not listening, and you feel like crying, just remember, there is someone out there struggling to pull a push to open door.',
            false,
            1551133230894,
            null,
            'user@appsus.com',
            'my@man.com',
            ['inbox'],
            false,
            ['important', 'lovable']
        ))
        mails.push(getEmptyMail(
            utilService.makeId(),
            'New dicovery',
            'Dear besty, I hope you studied well for tomorrow\'s exam. Today as I was reading, I noticed that the word "Studying" was made up of two words originally…" students dying!"',
            false,
            1551133980594,
            null,
            'user@appsus.com',
            'disco@ball.com',
            ['inbox'],
            false,
            ['important', 'lovable']
        ))
        mails.push(getEmptyMail(
            utilService.makeId(),
            'Don\'t mess with me',
            'Next time you make fun of me, I will give your phone number to all the kids and tell them it is Santa\'s hotline.',
            false,
            1551033930094,
            null,
            'user@appsus.com',
            'angry@mail.com',
            ['inbox'],
            true,
            ['important', 'lovable']
        ))
        mails.push(getEmptyMail(
            utilService.makeId(),
            'We might die',
            'Please remember, do not take life too seriously. You will never get out of it alive.',
            false,
            1521133930594,
            null,
            'user@appsus.com',
            'help@me.com',
            ['inbox'],
            true,
            ['important', 'lovable']
        ))
        mails.push(getEmptyMail(
            utilService.makeId(),
            'Happy birthday',
            'Happy Birthday to one of the very few people of whom I can remember their birthdays without depending on a Facebook reminder.',
            true,
            1558133930594,
            null,
            'user@appsus.com',
            'hero@momo.com',
            ['inbox'],
            true,
            ['important', 'lovable']
        ))
        mails.push(getEmptyMail(
            utilService.makeId(),
            'I know you broke up!',
            'Hey, beautiful. Stop crying because it is over. Start smiling because that ungrateful loser is someone else problem.',
            true,
            1251133930594,
            null,
            'barny@boy.com',
            'user@appsus.com',
            ['sent'],
            false,
            ['important', 'lovable']
        ))
        mails.push(getEmptyMail(
            utilService.makeId(),
            'Got your back bro',
            'Hey pal, if they hurt you again, just tell me, I can make their death look like an accident! Don\'t worry I have got your back.',
            true,
            1511933990594,
            null,
            'user@appsus.com',
            'marco@polo.com',
            ['inbox'],
            false,
            ['important', 'lovable']
        ))
        
     
        
        // mails.push(getEmptyMail(
        //     utilService.makeId(),
        //     'My nanas teeth',
        //     'Happy Birthday to my best friend ever! May your troubles be few and far between as my grandmother\'s teeth!',
        //     false,
        //     1251033930594,
        //     null,
        //     'user@appsus.com',
        //     'funny@guy.com',
        //     ['inbox'],
        //     true,
        //     ['important', 'lovable']
        // ))
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








