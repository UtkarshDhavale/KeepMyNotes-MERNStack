import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [credential, setCredential] = useState({email:"",password:""});
    const navigate = useNavigate();

    const handleOnSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',        
            },
            body: JSON.stringify({email:credential.email,password:credential.password}) 
        });
    
        const json = await response.json();
        if(json.success){
            localStorage.setItem("authToken",json.authToken);
            navigate('/');
        }
        else{
            alert("Invalid Credential");
        }
    
    }

    const handleOnChange=(e)=>{
        setCredential({...credential,[e.target.name]: e.target.value});
    }

    return (
        <div>
            <form className="container" onSubmit={handleOnSubmit}>
                <div className="form-group my-2">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credential.email} onChange={handleOnChange} aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credential.password} onChange={handleOnChange} placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
