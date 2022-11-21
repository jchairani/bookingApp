import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import "./reserve.css"
import useFetch from "../../hooks/useFetch";
import { useState, useEffect, useContext, useNavigate } from 'react';
import {SearchContext} from "../../context/SearchContext";
import axios from 'axios';
const Reserve = ({ setOpen, hotelId }) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [selectedRooms, setSelectedRooms] = useState([]);
    const { dates } = useContext(SearchContext);

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const date = new Date(start.getTime());
        const dates = [];

        while (date <= end) {   
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }
        return dates;
    }

    const alldates = getDatesInRange(dates[0].startDate,dates[0].endDate);

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some(date=>alldates.includes(new Date(date).getTime()));
        return !isFound;
    }

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item => item !== value))
    }
    
    const navigate = useNavigate();

    const handleClick = async() => {
        try{
            await Promise.all(
                selectedRooms.map((roomId)=>{
                    const res = axios.put(`/rooms/availability/${roomId}`,{
                        dates: alldates
                    });
                    return res.data;
                })
            )
            setOpen(false);
            navigate("/");
        }catch(err){

        }
    }

    const fetchData = async () => {
        try {
            await axios.get(`/hotels/room/${hotelId}`)
                .then(res => {
                    setData(res.data);
                    console.log(res.data);
                })
        } catch (err) {
            setError(err);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
                <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumber.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
                <button className="rButton" onClick={handleClick}>
                    Reserve Now!
                </button>
            </div>
        </div>
    )
}

export default Reserve;