import style from "./index.module.css"
import book from "../assets/christianbook.jpg"

const LibraryPress = ()=>{
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
                <input type={"text"} placeholder={"Enter a book name"}/>
            </div>
        </div>
    )
}
export default LibraryPress