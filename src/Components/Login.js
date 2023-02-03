import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {

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
            props.showAlert("success","Logged in Succesfully");
            navigate('/');
        }
        else{
            //alert("Invalid Credential");
            props.showAlert("danger","Invalid Credential");
        }
    }

    const handleOnChange=(e)=>{
        setCredential({...credential,[e.target.name]: e.target.value});
    }

    return (
        <div className="container mt-2">
            <h3 className="container my-3">Login to KeepMyNotes</h3>
            <form className="container" onSubmit={handleOnSubmit}>
                <div className="form-group my-2">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credential.email} onChange={handleOnChange} aria-describedby="emailHelp" placeholder="Enter email" minLength={5} required/>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credential.password} onChange={handleOnChange} placeholder="Password" minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
