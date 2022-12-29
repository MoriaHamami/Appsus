import { storageService } from '../../../services/async-storage.service.js'

const USER_KEY = 'mailUserDB'

_createLoggedUser()

export const mailUserService = {
    get
}

function get() {
    return storageService.query(USER_KEY)
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