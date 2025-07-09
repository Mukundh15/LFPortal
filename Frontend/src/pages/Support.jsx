import { TextField, Button, Alert } from "@mui/material";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Support() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ name: '', email: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get("http://localhost:8080/LFPortal/Profile", { withCredentials: true })
            .then(res => {
                setUserData({
                    name: res.data.user.name,
                    email: res.data.user.email
                });
            })
            .catch(() =>{
                navigate('/Login', {
                    state: { error: 'Please login to access the Support page.' }
                });
            });
    }, []);

    let HandleClick = (e) => {
        e.preventDefault();
        const data = {
            Name: e.target.name.value,
            Email: e.target.email.value,
            Description: e.target.description.value
        };

        axios.post("http://localhost:8080/LFPortal/Support", data, { withCredentials: true })
            .then(res => {
                if (res.data.success) {
                    setMessage(res.data.message);
                    setError('');
                } else {
                    setError(res.data.message);
                }
            })
            .catch(err => {
                setError("Something went wrong");
                console.log(err);
            });
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
            <div className="mb-3">
                {message && <Alert severity="success" sx={{ width: 500 }}>{message}</Alert>}
                {error && <Alert severity="error" sx={{ width: 500 }}>{error}</Alert>}
            </div>
            <h2 className="mb-4">SUPPORT</h2>
            <form onSubmit={HandleClick}>
                <div className="mb-4">
                    <TextField name="name" label="Enter Your Name" variant="outlined" sx={{ width: 500 }} value={userData.name}/>
                </div>
                <div className="mb-4">
                    <TextField name="email" label="Enter Your Email" variant="outlined" sx={{ width: 500 }} value={userData.email} />
                </div>
                <div className="mb-4">
                    <TextField name="description" label="What's Your Problem" variant="outlined" multiline rows={4} sx={{ width: 500 }} />
                </div>
                <div className="text-center mt-4">
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Support;
