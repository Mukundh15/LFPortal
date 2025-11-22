import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { BASE_URL } from "../config";
function CardsInfo() {
    const [cardDetails, setCardDetails] = useState({});
    const [error, setError] = useState('');
    const location = useLocation();
    const { state } = location;
    const navigate=useNavigate();
    const [userdata,setuserdata]=useState({});
    let handleDelete=()=>{
      axios.delete(`${BASE_URL}/LFPortal?id=${state.id}`, { withCredentials: true })
      .then(res => {
        alert("Deleted Successfully");
        navigate('/');
      })
      .catch(err => {
        alert("Error deleting the product");
        console.error(err);
      });
    }
    useEffect(() => {
        axios.get(`${BASE_URL}/LFPortal/Profile`, { withCredentials: true })
            .then(res => {
                setuserdata({Email:res.data.user.email,id:res.data.user.id});
            })
            .catch(() =>{
                navigate('/Login', {
                    state: { error: 'Please login to access the Information of cards page.' }
                });
            });
        axios
        .get(`http://localhost:8080/LFPortal/cardData?id=${state.id}`, { withCredentials: true })
        .then(res => {
            const data = res.data;
            setCardDetails({
            productname: data.productName,
            image: data.image,
            details: data.productDiscription,
            lf: data.item,
            name: data.name,
            nameid:data.nameid
            });
        })
        .catch(err => {
            if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message);
            } else {
            setError("An error occurred while fetching card details.");
            }
        });
    }, [state.id]);
    let deletebutton=(cardDetails.nameid==userdata.id);
  return (
    <div className=" container d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
      <h2 className="text-center">Details:</h2>
      <div className=" mb-3">
        {error && <Alert severity="error" sx={{ width: 500 }}>{error}</Alert>}
      </div>
      <div className="row shadow-sm p-4 bg-white rounded" style={{ width: "100%", maxWidth: "900px" }}>
        <div className="col-md-6 mb-3 mb-md-0">
          {cardDetails.image && (
            <img src={cardDetails.image} className="card-img-top" alt="Product" style={{
              width: '90%',
              height: 'auto',
              maxHeight: '400px',
              objectFit: 'cover',
              borderRadius: '8px'
            }}/>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center"><strong>{cardDetails.lf} Product</strong></h3>
          <h3>Name of Person who {cardDetails.lf}: <strong>{cardDetails.name}</strong></h3>
          <h3 className="card-title">Product: <strong>{cardDetails.productname}</strong></h3>
          <h3>Details: <strong>{cardDetails.details}</strong></h3>
          <h3>Contact Email: <strong>{userdata.Email}</strong></h3>
        </div>
      </div>
      <div className="m-5">
        {(deletebutton)?<form action=""><Button variant="contained" onClick={handleDelete}>Delete</Button></form>:null}
      </div>
    </div>
  );
}

export default CardsInfo;
