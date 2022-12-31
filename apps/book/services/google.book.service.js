const GOOGLE_URL = `https://www.googleapis.com/books/v1/volumes?q=%20p&key=${'AIzaSyAPZ0iGnif_nDL5PmQ2gyH4JUsUui78X0M'}`

export const googleBookService = {
    query
}

function query(filterBy) {

    return axios.get(GOOGLE_URL).then(googleBooks => {
        if (filterBy) {
            const regex = new RegExp(filterBy, 'i')
            googleBooks = googleBooks.data.items.filter(book => regex.test(book.volumeInfo.title))
            return googleBooks
        }
        return []
    })

}

