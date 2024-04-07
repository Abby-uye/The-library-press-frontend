import {useState} from "react";
import {useNavigate} from "react-router-dom";
import style from"./index.module.css"
import {ErrorMessage, Field, Formik} from "formik";
import * as Yup from "yup";

    const Login = ()=>{
    const [email,setEmail] =useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [errorMessage,setErrorMessage] = useState("");

        const validateFields = Yup.object().shape({
            email: Yup.string().email("Invalid email").required("Email field is required"),
            password: Yup.string().required("Password field is required")
        });

    const handleLogin = async (e)=> {
        e.preventDefault()


        try {


            const response = await fetch("http://localhost:8585/api/v1/the-library-app/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            });
            const data = await response.json()
            if (response.ok) {
                setErrorMessage("")
                navigate(`/search/${data.readerId}`)
            } else {
                setErrorMessage(data.err)
            }
        } catch (error) {
            setErrorMessage(error)

        }
    }


        return(
            <div className={style.login}>
                <Formik initialValues={{
                    email: "",
                    password:""
                }}
                        validationSchema={validateFields}
                        onSubmit={handleLogin}
                >
                    {({values,errors,touched,handleChange,handleBlur}) =>(
                        <form>

                            <div style={style.emailcont}>
                                <Field
                                    type={"email"}
                                    name={"email"}
                                    placeHolder={"Enter your email"}
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{borderColor: errors.title && touched.title ? "red" : "inherit"}}
                                />
                                {errors.email && touched.email && (
                                    <div className={style.error}>{errors.email}</div>
                                )}
                            </div>

                            <div style={style.passwordCont}>
                                <Field
                                    type={"password"}
                                    name={"password"}
                                    placeHolder={"Enter your password"}
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{borderColor: errors.password && touched.password ? "red" : "inherit"}}
                                />
                                {errors.password && touched.password && (
                                    <div className={style.error}>{errors.password}</div>
                                )}
                            </div>
                        </form>

                    )}
                </Formik>
            </div>
        )

    }
export default Login