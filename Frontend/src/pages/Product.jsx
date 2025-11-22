import React from "react";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl} from "@mui/material";
import { useState ,useEffect} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
function Product() {
    const [image,setImage]=useState(null);
    const [itemType,setItemType]=useState("");
    const navigate=useNavigate();
    const [userData,setUserData]=useState({ name: '', email: '' });
    useEffect(() => {
        axios.get(`${BASE_URL}/LFPortal/Profile`, { withCredentials: true })
            .then(res => {
                setUserData({
                    userId:res.data.user.id,
                    name:res.data.user.name,
                    email:res.data.user.email
                });
            })
            .catch(()=>{
                navigate('/Login', {
                    state: { error: 'Please login to access the Report a Product page.' }
                });
            });
    }, []);

    const handleSubmit=(e)=>{
        e.preventDefault();
    
        const formData=new FormData();
        formData.append("name",e.target.name.value);
        formData.append("userid",userData.userId);
        formData.append("productName",e.target.productName.value);
        formData.append("description",e.target.description.value);
        formData.append("item", itemType);
        formData.append("image",image);

        axios.post(`${BASE_URL}/LFPortal`,formData,{withCredentials:true})
          .then(res=>{
              console.log(res.data);
              navigate('/');
          })
          .catch(err=>console.log(err));
    }

    return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2 className=" m-5">REPORT PRODUCT</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="d-flex flex-column gap-4">
        <div className="mb-4">
          <TextField
            id="name"
            name="name"
            label="Enter Your Name"
            variant="outlined"
            value={userData.name}
            sx={{ width: 500 }}
          />
        </div>

        <div className="mb-4">
          <TextField
            id="productName"
            name="productName"
            label="Product Name"
            variant="outlined"
            sx={{ width: 500 }}
          />
        </div>

        <div className="mb-4">
          <FormControl sx={{ width: 500 }}>
            <InputLabel id="item-label">Item Type</InputLabel>
            <Select
              labelId="item-label"
              id="item"
              name="item"
              value={itemType}
              label="Item Type"
              onChange={(e) => setItemType(e.target.value)}
              required
            >
              <MenuItem value="Lost">Lost</MenuItem>
              <MenuItem value="Found">Found</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="mb-4">
          <TextField
            id="description"
            name="description"
            label="Product Description Where You Found or Lost etc"
            variant="outlined"
            multiline
            rows={4}
            sx={{ width: 500 }}
          />
        </div>

        <div className="mb-4">
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                style={{ width: 500 }}
            />
        </div>
        <div className="text-center mt-4">
          <Button type="submit" variant="contained" color="primary">
            Submit Report
          </Button>
        </div>
      </form>
    </div>
    );
}

export default Product;
