export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    getRandomColor,
    padNum,
    getDayName,
    getMonthName,
    getDate,
    getAmount,
    debounce
}


//   var aDay = 24*60*60*1000;
//   console.log(timeSince(new Date(Date.now()-aDay)));
//   console.log(timeSince(new Date(Date.now()-aDay*2)));

function getDate(timestamp) {
    timestamp = new Date(timestamp)
    if (!timestamp) return ''
    if (_isThisYear(timestamp)) {
        // Get the date if timestamp is from this year
        var date = timestamp.toLocaleDateString('en-us', {month:"short", day:"numeric"})
    } else {
        // Get the year if timestamp is not from this year
        var date = timestamp.getFullYear()
    }
    return date
}

// function _isToday(ts) {
//     var today = new Date().setHours(0, 0, 0, 0);
//     var thatDay = new Date(ts).setHours(0, 0, 0, 0);
//     return today === thatDay
// }

// function _isThisWeek(ts) {
//     var today = new Date()
//     var thatDay = new Date(ts)

//     const weeksDiff = _getWeeksDifference(thatDay, today)
//     return weeksDiff === 0
// }

function _isThisYear(ts) {
    var today = new Date()
    var thatDay = new Date(ts)

    const monthDiff = _getMonthDifference(thatDay, today)
    return monthDiff < 12
}

// function _getWeeksDifference(dt2, dt1) {
//     var diff = (dt2.getTime() - dt1.getTime()) / 1000
//     diff /= (60 * 60 * 24 * 7)
//     return Math.abs(Math.floor(diff))

// }
function _getMonthDifference(startDate, endDate) {
    return (
        endDate.getMonth() -
        startDate.getMonth() +
        12 * (endDate.getFullYear() - startDate.getFullYear())
    )
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'short' })
}


function getMonthName(date) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]
    return monthNames[date.getMonth()]
}



function getAmount(amount, currency) {
    switch (currency) {
        case 'USD':
            return `$ ${amount}`
        case 'EUR':
            return `${amount} €`
        case 'ILS':
            return `₪ ${amount}`
        default:
            return `${amount}`
    }
}

// function makeId(length = 6) {
//     var txt = ''
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

//     for (var i = 0; i < length; i++) {
//         txt += possible.charAt(Math.floor(Math.random() * possible.length))
//     }

//     return txt
// }

// function makeLorem(size = 100) {
//     var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
//     var txt = ''
//     while (size > 0) {
//         size--
//         txt += words[Math.floor(Math.random() * words.length)] + ' '
//     }
//     return txt
// }

// function getRandomIntInclusive(min, max) {
//     min = Math.ceil(min)
//     max = Math.floor(max)
//     return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
// }

// function saveToStorage(key, value) {
//     localStorage.setItem(key, JSON.stringify(value))
// }

// function loadFromStorage(key) {
//     const data = localStorage.getItem(key)
//     return (data) ? JSON.parse(data) : undefined
// }

// function padNum(num) {
//     return (num > 9) ? num + '' : '0' + num
// }

// function getDayName(date, locale) {
//     date = new Date(date)
//     return date.toLocaleDateString(locale, { weekday: 'long' })
// }

// function getMonthName(date) {
//     const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
//         'July', 'August', 'September', 'October', 'November', 'December'
//     ]
//     return monthNames[date.getMonth()]
// }

function debounce(func, timeout = 500) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}
