import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function Cards({ image, productName ,id}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/CardInfo',{state:{id}});
  };

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={image} className="card-img-top" alt="Product"/>
      <div className="card-body">
        <h3 className="card-title">{productName}</h3>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Info
        </Button>
      </div>
    </div>
  );
}

export default Cards;
