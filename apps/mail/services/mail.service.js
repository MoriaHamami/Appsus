import { utilService } from '../../../services/util.service'
import { storageService } from '../../../services/storage.service'
import { asyncStorageService } from '../../../services/async-storage.service'

const MAIL_KEY = 'mailDB'

_createLoggedUser
_createMails

function _createLoggedUser() {
    const loggedinUser = {
        email: 'user@appsus.com',
        fullname: 'Mahatma Appsus'
    }
}

function _createMails() {
    const email = {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com'
    }
}