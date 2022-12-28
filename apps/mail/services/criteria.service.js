import { storageService } from '../../../services/async-storage.service.js'

const CRITERIA_KEY = 'criteriaDB'

export const criteriaService = {
    get,
    save,
    getDefaultCriteria,
}

function save(criteria) {
    return storageService.saveToStorage(CRITERIA_KEY, criteria)
}

function get() {
    return storageService.query(CRITERIA_KEY)

}

function getDefaultCriteria() {
    return {
        'status': 'inbox',
        'txt': '',
        'isRead': '',
        'isStarred': '',
        'labels': []
    }
}