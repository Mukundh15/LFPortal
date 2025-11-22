import { TextField, Button} from "@mui/material";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useState } from "react";
import {Alert} from "@mui/material";
import { BASE_URL } from "../config";
function Signup(){
    const [error,seterror]=useState("");
    let HandleClick=(e)=>{
        e.preventDefault();

        const data={
            Name: e.target.name.value,
            Email: e.target.email.value,
            Password: e.target.password.value,
            PhoneNumber: parseInt(e.target.phoneNumber.value, 10)
        };

        axios.post(`${BASE_URL}/LFPortal/Signup`,data,{withCredentials: true})
            .then(res=>{
                window.location.href='/';
            })
            .catch(err=>{
                if (err.response?.data?.message) {
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
        <h2 className="mb-4">SIGN UP</h2>
        <form onSubmit={HandleClick} autoComplete="off">
            <div className="mb-4">
                <TextField
                id="Name"
                name="name"
                label="Enter Your Name"
                variant="outlined"
                sx={{ width: 500 }}
                />
            </div>
            <div className="mb-4">
                <TextField
                id="email"
                name="email"
                label="Enter Your Email"
                variant="outlined"
                sx={{ width: 500 }}
                />
            </div>
            <div className="mb-4">
                <TextField
                id="password"
                name="password"
                label="Enter Your Password"
                variant="outlined"
                sx={{ width: 500 }}
                autoComplete="new-password"
                />
            </div>
            <div className="mb-4">
                <TextField
                id="phoneNumber"
                name="phoneNumber"
                label="Enter Your Phone Number"
                variant="outlined"
                sx={{ width: 500 }}
                />
            </div>
            <div className="d-flex justify-content-center ">
                <p className="me-2">Already Have an Account??</p>
                <Link to="/Login" >Login</Link>
            </div>
            <div className="text-center mt-4">
                <Button type="submit" variant="contained" color="primary">
                    Sign up
                </Button>
            </div>
        </form>
        <br />
    </div>
}
export default Signup;