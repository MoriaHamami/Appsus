import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
}



function query(filterBy = getDefaultFilter()) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regex.test(note.info.txt))
            }
            // if (filterBy.minPrice) {
            //     notes = notes.filter(note => note.listPrice.amount >= filterBy.minPrice)
            // }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
    // return axios.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getDefaultFilter() {
    return { txt: '' }
}

function getEmptyNote(type) {
    return {
        id: '',
        type,
        isPinned: false,
        info: {
            title: 'Title',
            txt: 'text',
            url: '',
            img: '',
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence"},
                { txt: "Coding power" }
            ]
        },
        style: {
            backgroundColor: "#ffffff"
        }
    }
}
// function getEmptyNote() {
//     return {
//         id: '',
//         type: "note-txt",
//         isPinned: false,
//         info: {
//             title:'Title',
//             txt: '',
//             url: ''
//         },
//         style: {
//             backgroundColor: "#ffffff"
//         }
//     }
// }


function _createNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: "n101",
                type: "text",
                isPinned: true,
                info: {
                    title: 'I am a title',
                    txt: "Fullstack Me Baby!"
                },
                style: {
                    backgroundColor: "rgb(239, 217, 78)"
                }
            },
            {
                id: "n102",
                type: "file",
                isPinned: false,
                info: {
                    // url: "http://some-img/me",
                    img: "./assets/img/note-imgs/landscape.jpeg",
                    // img: "C:\\fakepath\\landscape.jpeg",
                    title: "My Trip"
                },
                style: {
                    backgroundColor: "rgb(132, 213, 103)"
                }
            },
            {
                id: "n103",
                type: "url",
                isPinned: false,
                info: {
                    url: "https://www.youtube.com/watch?v=ACVLcuVChAU",
                    title: "Music"
                },
                style: {
                    backgroundColor: "rgb(90, 198, 206)"
                }
            },
            {
                id: "n104",
                type: "note-todos",
                isPinned: false,
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null },
                        { txt: "Coding power", doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: "rgb(245, 137, 137)"
                }
            }
        ]

        storageService.saveToStorage(NOTE_KEY, notes)
    }

}

