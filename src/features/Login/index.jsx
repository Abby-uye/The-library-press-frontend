import {useState} from "react";
import {useNavigate} from "react-router-dom";
import style from "./index.module.css"

const Login = ()=>{


    const [email,setEmail] = useState("")
    const  [password,setPassword] = useState("")
    const navigate = useNavigate()
    const [errorMessage,setErrorMessage] = useState()

    const handleLogin = async (event)=>{
        event.preventDefault()
        try{
            const response = await fetch("http://localhost:8585/api/v1/the-library-press/login",{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json()
            if(response.ok){
                setErrorMessage("")
                navigate("/login")
            }else setErrorMessage(data.err )

        }catch (error){
            setErrorMessage(error)
        }

    }

    const handleEmail = (event)=>{
        setEmail(event.target.value)
    }
    const handlePassword = (event)=>{
        setPassword(event.target.value)
    }
    return(
        <div className={style.login}>
            <form
                onSubmit={handleLogin}
            >
                <div className={style.mainCont}>
                <div>
                    <input type={"email"}
                           value={email}
                           placeholder={"Enter your email"}
                           onChange={handleEmail}

                    />
                    {errorMessage && <span>{errorMessage}</span>}
                </div>
                <div>
                    <input type={"password"}
                           value={password}
                           placeholder={"Enter your password"}
                           onChange={handlePassword}
                    />
                    {errorMessage && <span>{errorMessage}</span>}
                </div>
                    <button style={{backgroundColor:"white"}} type={"submit"}>Submit</button>
                </div>
            </form>
        </div>
    )


}
export default Login