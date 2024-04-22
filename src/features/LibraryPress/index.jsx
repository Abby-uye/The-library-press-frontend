import style from "./index.module.css"
import book from "../../assets/christianbook.jpg"
import {useState} from "react";
import {Link, useParams} from "react-router-dom";

const LibraryPress = ()=>{

        const params = useParams()
        const id =params.id;
        const [title, setTitle] = useState("");
        const [books, setBooks] = useState([]);
        const [errorMessage, setErrorMessage] = useState("");
        const [readingList, setReadingList] = useState([]);
        const [readingListError, setReadingListError] = useState("");


        const handleReadingList = async()=>{
            try{
                const response = await fetch("http://localhost:8585/api/v1/the-library-app/get-reading-list",{
                    method:"POST",
                    headers:{
                        "Content-Type " : "application/json"
                    },
                    body:JSON.stringify({title})
                })
                if (response.ok){
                    const data = await  response.json()
                    setReadingList(data.books);
                    setReadingListError("")
                }
                else{
                    const errorData = await response.json()
                    setReadingList([])
                    setReadingListError(errorData.error)
                }
            }
            catch (error){
                setReadingListError("failed to fetch book due to network failure")
            }
        }

        const handleSearchBook = async (e) =>{
            e.preventDefault()

            try{
                const response = await fetch(`http://localhost:8585/api/v1/the-library-app/search-book${id}`,{
                    method:"POST",
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify({title})
                });
                if (response.ok){
                    const data = response.json()
                    setBooks(data.books)
                    setErrorMessage("")
                }
                else {
                    const errorData = await response.json()
                    console.log(errorData.error)
                    setBooks([])
                    setErrorMessage(errorData.error)
                }
            }
            catch (error){
                console.log("error occurred while fetching book",error)
                setErrorMessage("failed to fetch book, due to network failure")

            }
        };

        return(
        <div>
            <div className={style.orangeColour}></div>
            <p className={style.search}>Search And Read <span style={{display:"block"}}>Your Favorite Ebooks</span></p>
            <div className={style.navbar}>
                <p>TLP</p>
                <article>
                    <p><a href="default.asp">Home</a></p>
                    <p><a href="news.asp">News</a></p>
                    <p><a href="contact.asp">Contact</a></p>
                    <p><a href="about.asp">About</a></p>
                </article>
            </div>
            <div className={style.mainCont}>
                    <div>
                    <p className={style.pt}>The library <span style={{display:"block"}}>Press</span></p>
                        <p style={{color:"white",fontSize:"8px",display:"block"}}>"Books are the quietest and most constant of friends; <br/>they are the most accessible and wisest of counselors,<br/> and the most patient of teachers." - Charles William Eliot</p>
                        <p className={style.readNow}>Read Now</p>
                    </div>
                    <img src={book} alt={""}/>


            </div>
            <div className={style.footer}>
                <div>
                <Link to={"/register"}>
                    <button style={{marginTop:"23px",backgroundColor:"white"}}>Register</button>
                </Link>
                    <Link to={"/login"}>
                        <button style={{marginTop:"23px",backgroundColor:"white"}}>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default LibraryPress