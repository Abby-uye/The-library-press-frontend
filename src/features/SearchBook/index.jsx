
import style from "./index.module.css"
import * as Yup from 'yup';
import {useState} from "react";
import {useParams} from "react-router-dom";
import {Field, Form, Formik} from "formik";

const SearchBook = ()=>{
    const [title, setTitle] = useState("")
    const params = useParams()
    const id = params.id
    const [readingList, setReadingList] = useState([])
    const [readingListError, setReadingListError] = useState("");
    const [books, setBooks] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const validateBook = Yup.object().shape({
        title: Yup.string().required("You have to enter a valid book title to search for  book")
    })
    const handleSubmit = async  (values, {resetForm})=> {
        try {
            const payLoad = {
                title: values.title
            };
            const response = await fetch(`http://localhost:8585/api/v1/the-library-app/search-book${id}`,{
                method : "POST",
                headers : {
                    "Content-Type" :"application/json"
                },
                body: JSON.stringify({title})
            })
            if (response.ok){
                const data = await response.json()
                setReadingList(data.books)
                setReadingListError("")
        }
            else {
                const errorData = response.json()
                setReadingList([])
                console.log(errorData.error)
                setReadingListError(errorData.error)
            }
    }
    catch (error){
            console.log("An error occurred while fetching book",error)
        setErrorMessage("failed to fetch book due to error message")
    }

    }
    return(
        <div className={style.searchBook}>
            <Formik
                initialValues = {{
                    title:""
                }}
                validationSchema ={validateBook}
                onSubmit={handleSubmit}
                >

                {({values,errors,touched,handleChange,handleBlur}) =>(


                <Form>
                    <div className={style.fields}>

                        <Field
                            type="text"
                            name="title"
                            placeholder="Enter a book title"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{ borderColor: errors.title && touched.title ? "red" : "inherit" }}
                        />
                        {errors.title && touched.tittle && (
                            <div className={style.error}>{errors.title}</div>
                        )}
                    </div>
                </Form>
                )}
            </Formik>

        </div>
    )
}

export default SearchBook