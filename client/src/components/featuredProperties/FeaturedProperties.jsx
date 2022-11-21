import "./featuredProperties.css";
import { useState, useEffect } from "react";
import axios from 'axios';
const FeaturedProperties = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      await axios.get("/hotels/?featured=true&limit=4")
        .then(res => {
          setData(res.data);
        })
    } catch (err) {
      setError(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="fp">
      <>
        {data.map(item => (
        <div className="fpItem" key={item._id}>
          <img
            src={item.photos[0]}
            alt=""
            className="fpImg"
          />
          <span className="fpName">{item.name}</span>
          <span className="fpCity">{item.city}</span>
          <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
          {item.rating && <div className="fpRating">
            <button>{item.rating}</button>
            <span>Excellent</span>
          </div>}
        </div>
        ))}
      </>

    </div>

  );
};

export default FeaturedProperties;
