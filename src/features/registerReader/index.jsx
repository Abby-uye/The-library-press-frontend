import {useState} from "react";
import {useNavigate} from "react-router-dom";
import style from "./index.module.css"

const RegisterReader = ()=>{
    const [name, setName] = useState("");
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")
    const handleRegister = async (e)=>{
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:8585/api/v1/the-library-press/register",{
                method :"POST",
                headers :{
                    "content-Type" : "application/json"
                },
                body : JSON.stringify({name,email,password})
            })
            const data = await response.json()
            if (response.ok){
                setErrorMessage("");
                navigate(`/login`)
            }
            else {
                setErrorMessage(data.err)
            }
        }
        catch (error){
            setErrorMessage(error)
        }

    }

    return(
        <div className={style.register}>
            <form onSubmit={handleRegister}>
                <div style={{paddingTop: "90px", paddingLeft: "70px"}}>
                    <input type={"text"} placeholder={"Enter your name"} name={"name"} value={name} onChange={(e)=>setName(e.target.value)}/>
                    <input type={"password"} placeholder={"Enter a valid password"} name={"password"} onChange={(e)=>setPassword(e.target.value) }/>
                   <div style={{display:"flex",flexDirection:"column",color:"red"}}>
                    <input type={"email"} placeholder={"Enter your email"} name={"email"} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    {errorMessage && <span>{errorMessage}</span>}
                   </div>
                </div>

                <button style={{width:"320px", height:"45px",marginTop:"30px",backgroundColor:"orangered",border:"1px ",marginLeft:"64px",borderRadius:"7px",color:"white", fontSize:"20px"}}>submit</button>
            </form>
        </div>
    )
}

export default RegisterReader;