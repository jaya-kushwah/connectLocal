import React, { useState, useEffect } from 'react';
import axios from 'axios'; // make sure this is imported
import Container from "../Container";
import { useNavigate } from 'react-router-dom';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
    // const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/card/getAllCardEvents');
        setEvents(response.data.data);
      } catch (err) {
        console.error("Error fetching events:", err.message);
      }
    };
    fetchEvents();
  }, []);

  // const handleImageClick = (eventId) => {
  //   console.log(eventId)
  //   navigate(`/interest/${eventId}`); // navigate to event detail page
  // };

  return (
    <Container>
      <div className="container-fluid p-0">
        <div style={{ marginLeft: "24%" }} className="container mt-4">
          <h1 style={{ marginTop: "-2%", marginLeft: "0%" }} className="events-heading">Upcoming Events</h1>
          <div style={{ gap: "4%" }} className="row g-4">
            {events.map((event) => (
              <div className="col-sm-6 col-md-4 col-lg-3" 
              // onClick={() => handleImageClick(event._id)}
              key={event._id}>
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

// Event Card
const EventCard = ({ event }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="card border-0 text-white overflow-hidden position-relative"
      style={{ height: "285px", width: "285px", cursor: "pointer" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={`http://localhost:8080/event/upload/${event.eventPic}`}
        className={`card-img-top position-absolute w-100 h-100 object-fit-cover ${hover ? "opacity-50 blur-sm" : ""}`}
        alt={event.eventTitle}
      />

      <div className={`card-img-overlay d-flex flex-column justify-content-center align-items-center text-center bg-dark bg-opacity-50 rounded ${hover ? "opacity-100" : "opacity-0"} transition-opacity`}>
        <h5 className="card-title">{event.eventTitle}</h5>
        <p className="card-text">📅 {event.eventDate}</p>
        <p className="card-text">📍 {event.location}</p>
        <p className="card-text">⏰ {event.eventTime}</p>
      </div>
    </div>
  );
};

export default EventsPage;
