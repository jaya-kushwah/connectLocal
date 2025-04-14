import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/Style/Indore.css';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const MumbaiEvents = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const filters = ['All', 'Today', 'Tomorrow', 'ThisWeekend', 'Free'];

  useEffect(() => {
    fetchEvents(activeFilter);
  }, [activeFilter]);

  const fetchEvents = async (filterType) => {
    try {
      let response;
      if (filterType === 'All') {
        response = await axios.get('http://localhost:8080/event/getAllEvents');
      } else {
        response = await axios.get(`http://localhost:8080/event/filter/${filterType}`);
      }
      setEvents(response.data.data);
    } catch (err) {
      console.error("Failed to fetch events:", err.message);
    }
  };

  const handleImageClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="events-container">
      <h1 style={{marginTop:"2%"}} className="events-heading">Popular Events in Indore</h1>

      <div className="filter-container">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-button ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter === 'ThisWeekend' ? 'This Weekend' : filter}
          </button>
        ))}
      </div>

      <div className="events-grid">
        {events.map((event) => (
          <div key={event._id} className="event-card animate-card">
            <div
              className="event-image-container"
              onClick={() => handleImageClick(event._id)}
            >
              <img
                src={`http://localhost:8080/event/upload/${event.eventPic}`}
                alt={event.eventName}
                className="event-image"
              />

              {/* <button className="favorite-button">
                <span className="favorite-icon">★</span>
              </button> */}
            </div>

            <div style={{ color: "#b9536a", marginTop: "3%", backgroundColor: "#dfd8d8" }} className="h6 fw-bold"> {event.eventName}</div>


            <div className="p-3 text-start fw-normal">
              <div className="d-flex justify-content-center gap-2">
                <div className="text-dark fw-bold">
                  Start Date - {dayjs(event.eventStartDate).format('DD/MM/YYYY')}
                </div>
                <div className="fw-bold">
                  End Date - {dayjs(event.eventEndDate).format('DD/MM/YYYY')}
                </div>
              </div>

              <div className="text-start">
                <p className="event-location">{event.location}</p>
              </div>

              <div className="fw-bold">
                <span>Slot: </span>{event.slots}
              </div>

              <div className="fw-bold">
                <span>Price: ₹</span>{event.slotPrice}/-
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MumbaiEvents;
