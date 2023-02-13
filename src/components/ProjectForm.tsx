import { Label, Textarea, TextInput } from "flowbite-react"
import { useState } from "react"
import { Sheets_URL, WriteURL } from "../constants/URLS"
import { UrlGenerate } from "../hooks/UrlGenerate"
import $ from "jquery";

const today = new Date()
const current_day = today.getDay()

export const ProjectForm = () => {

    // GET BOOK NAME
    const [bookname, setBookname] = useState("")
    const [author, setAuthor] = useState("")

    // CONSTANTS
    const [_date, setDate] = useState("")
    const [pages, setPages] = useState(0)
    const [summary, setSummary] = useState("")
    const [quote, setQuote] = useState("")


    // GET DATE AND TIME
    const date_read = _date.slice(0, 10).replace("-", "").replace("-", "")
    const time_end = _date.slice(11, 16).replace(":", "") + '00'
    const time_read = time_end.slice(0,2) === "00" ?
                        ((23).toString() + time_end.slice(2, 6))
                            :
                            time_end.slice(0,2) === "20" ?
                            ((19).toString() + time_end.slice(2, 6))
                                :
                                time_end.slice(0,2) > "10"?
                                    (time_end.slice(0, 1) + (parseInt(time_end.slice(1, 2)) - 1).toString() + time_end.slice(2, 6))
                                    :
                                    ("0" + (parseInt(time_end.slice(0, 2)) - 1).toString() + time_end.slice(2, 6))


    const fetchData = async () => {
        const response = await fetch(Sheets_URL)
        const data = await response.json()
        const books = data.Books
        setBookname(books.name[current_day])
        setAuthor(books.author[current_day])
    }
    fetchData()

    const dtt = new Date(_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

    function insert_value() {
        // URL is 
        var URL = WriteURL + "?callback=ctrlq&date=" + dtt.toString() + "&bookname=" + bookname + "&pages=" + pages + "&summary=" + summary + "&quote=" + quote + "&action=insert";

        // make post request to by passing the URL using fetch API with cors mode
        fetch(URL, { mode: 'no-cors' })
            .then((response) => {
                console.log(response);
                return response.json()
            })

        var request = $.ajax({
            crossDomain: true,
            url: URL,
            method: "GET",
            dataType: "jsonp"
        });
    }


    return (
        <form className="flex flex-col gap-4 z-0">

            <div className="w-11/12 xl:w-3/4 mx-auto">
                <div className="mt-4 mb-2 block">
                    <Label
                        className="text-lg"
                        value="Book Name"
                    />
                </div>
                {
                    bookname.length === 0 ?
                        <TextInput type="text" placeholder="Name of the book" required={true} className="animate-pulse" onChange={(e) => {
                            setBookname(e.target.value)
                        }} />
                        :
                        <TextInput value={bookname} disabled />
                }


                <div className="mt-4 mb-2 block">
                    <Label
                        className="text-lg"
                        value="Date Read"
                    />
                </div>
                <TextInput type="datetime-local" placeholder="Date on which you've read" required={true} onChange={(e) => {
                    setDate(e.target.value)
                }} />


                <div className="mt-4 mb-2 block">
                    <Label
                        className="text-lg"
                        value="Pages Read"
                    />
                </div>
                <TextInput type="number" placeholder="Number of pages read" required={true} onChange={(e) => {
                    setPages(parseInt(e.target.value))
                }} />


                <div className="mt-4 mb-2 block">
                    <Label
                        className="text-lg"
                        value="Summary"
                    />
                </div>
                <Textarea placeholder="Summary of this section" onChange={(e) => {
                    setSummary(e.target.value)
                }} />


                <div className="mt-4 mb-2 block">
                    <Label
                        className="text-lg"
                        value="Favourite Quote"
                    />
                </div>
                <Textarea placeholder="Favourite Quote from this section" onChange={(e) => {
                    setQuote(e.target.value)
                }} />

                <div className="flex flex-row justify-around">
                    <a target={"_blank"} rel="noreferrer" href={UrlGenerate(
                        bookname, date_read, time_read, time_end, author, pages.toString(), summary, quote
                        )}
                        className="my-5 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                        Calendar
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>

                    <button onClick={insert_value}
                        className="my-5 inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">
                        Sheets
                        <i className="fa-solid fa-file-lines"></i>
                    </button>
                </div>

            </div >
        </form>
    )
}