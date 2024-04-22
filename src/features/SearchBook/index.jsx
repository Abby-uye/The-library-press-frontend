
import style from "./index.module.css"
import {useState} from "react";
import {useParams} from "react-router-dom";


const SearchBook = ()=>{
    const [title, setTitle] = useState("")
    const params = useParams()
    const id = params.id
    const [readingList, setReadingList] = useState([])
    const [readingListError, setReadingListError] = useState("");
    const [books, setBooks] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");


    const handleSearch = async  ()=> {
        try {

            const response = await fetch(`http://localhost:8585/api/v1/the-library-press/search-book${id}`,{
                method : "POST",
                headers : {
                    "Content-Type" :"application/json"
                },
                body: JSON.stringify({title})
            })
            if (response.ok){
                const data = await response.json()
                setBooks(data.books)
                setErrorMessage("")
        }
            else {
                const errorData = response.json()
                setBooks([])
                console.log(errorData.error)
                setErrorMessage(errorData.error)
            }
    }
    catch (error){
            console.log("An error occurred while fetching book",error)
        setErrorMessage("failed to fetch book")
    }


    }
    const handleNavigateToFormat = (formatURL) => {
        window.open(formatURL, "_blank");
    };
    const handleBookSearch = (event)=>{
        setTitle(event.target.value)
    }
    return(
        <div className={style.searchBook}>
            <form onSubmit={handleSearch}>
                <div className={style.inputBtn}>
                    <input
                    type={"text"}
                    name={"search"}
                    placeholder={"Enter a book title"}
                    onChange={handleBookSearch}
                    value={title}
                    />
                    {errorMessage && <span>{errorMessage}</span>}
                </div>
                <div>
                    <button type={"submit"}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SearchBook