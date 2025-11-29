import { TextField, Button} from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState ,useEffect} from "react";
import { Alert } from "@mui/material";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../config";

function Login(){
    const navigate=useNavigate();
    const location = useLocation();
    const [error,seterror]=useState("");

    useEffect(() => {
        if (location.state && location.state.error) {
            seterror(location.state.error);
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);
    let HandleClick=(e)=>{
        e.preventDefault();

        const data={
            Email: e.target.email.value,
            Password: e.target.password.value
        };

        axios.post(`${BASE_URL}/LFPortal/Login`,data,{withCredentials: true})
            .then(res=>{
                console.log(res.data);
                window.location.href='/';
            })
            .catch(err=>{
                if (err.response && err.response.data && err.response.data.message) {
                    seterror(err.response.data.message);
                } else {
                    seterror("An unexpected error occurred.");
                }
            });
    }
    return <div className="d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
        <div className="mb-3">
            {error && <Alert severity="error" sx={{ width: 500 }}>{error}</Alert>}
        </div>
        <h2 className="mb-4 mt-5">Login</h2>
        <form onSubmit={HandleClick} autoComplete="off">
            <div className="mb-4">
                <TextField
                id="email"
                name="email"
                label="Enter Your Email"
                variant="outlined"
                sx={{ width: 350 }}
                />
            </div>
            <div className="mb-2 login">
                <TextField
                id="password"
                name="password"
                label="Enter Your Password"
                variant="outlined"
                sx={{ width: 350 }}
                autoComplete="new-password"
                />
            </div>
            <div className="d-flex mb-4 justify-content-end">
                <Link>Forgot Password?</Link>
            </div>
            <div className="d-flex justify-content-center ">
                <p className="me-2">Don't Have a Account??</p>
                <Link to="/Signup" >Sign Up</Link>
            </div>
            <div className="text-center mt-4">
                <Button type="submit" variant="contained" color="primary">
                    Login
                </Button>
            </div>
        </form>
        <br /> <br /><br />
    </div>
}
export default Login;