export const UrlGenerate = (bookname: string, date_read: string, time_read: string, time_end: string, author: string, pages: string, summary: string, quote: string) => {

    const final_url = 'https://calendar.google.com/calendar/u/0/r/eventedit?' +
        'text=' + bookname +
        '&dates=' + date_read +
        'T' + time_read +
        '/' + date_read +
        'T' + time_end +
        '&details=by: ' + author +
        '%0A%0APages: ' + pages +
        '%0A%0ASummary: ' + summary +
        '%0A%0AQuote: ' + quote

    return final_url
}