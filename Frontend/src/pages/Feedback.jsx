import { TextField, Button} from "@mui/material";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useState,useEffect } from "react";
import axios from 'axios';
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
function Feedback(){
    const [Ratingvalue, setValue] = useState(5);
    const [userData, setUserData] = useState({ name: '', email: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate=useNavigate();
    useEffect(() => {
        axios.get(`${BASE_URL}/LFPortal/Profile`, { withCredentials: true })
            .then(res => {
                setUserData({
                    name: res.data.user.name,
                    email: res.data.user.email
                });
            })
            .catch(() =>{
                navigate('/Login', {
                    state: { error: 'Please login to access the Feedback page.' }
                });
            });
    }, []);

    let HandleClick=(e)=>{
        e.preventDefault();

        const data={
            Name: e.target.name.value,
            Email: e.target.email.value,
            Rating:Ratingvalue,
            Description: e.target.description.value
        };

        axios.post(`${BASE_URL}/LFPortal/Feedback`,data,{ withCredentials: true})
            .then(res=>{
                setMessage("Feedback submitted successfully!");
                setError('');
            })
            .catch(err=>{
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError("An unexpected error occurred.");
                }
            });
    }

    return <div className="d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
        <div className="mb-3">
            {message && <Alert severity="success" sx={{ width: 500 }}>{message}</Alert>}
            {error && <Alert severity="error" sx={{ width: 500 }}>{error}</Alert>}
        </div>
        <h2 className="mb-4">FEEDBACK</h2>
        <form onSubmit={HandleClick}>
            <div className="mb-4">
                <TextField
                id="Name"
                name="name"
                label="Enter Your Name"
                variant="outlined"
                value={userData.name}
                sx={{ width: 350 }}
                />
            </div>
            <div className="mb-4">
                <TextField
                id="email"
                name="email"
                label="Enter Your Email"
                value={userData.email}
                variant="outlined"
                sx={{ width: 350 }}
                />
            </div>
            <div className="mb-4">
                <Typography component="legend">Rating</Typography>
                <Rating
                    name="simple-controlled"
                    value={Ratingvalue}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    size="large"
                />
            </div>
            <div className="mb-4">
                <TextField
                id="description"
                name="description"
                label="Enter Anything we need to change"
                variant="outlined"
                multiline
                rows={4}
                sx={{ width: 350 }}
                />
            </div>
            <div className="text-center mt-4">
                <Button type="submit" variant="contained" color="primary">
                    Submit Feedback
                </Button>
            </div>
        </form>
    </div>
}
export default Feedback;