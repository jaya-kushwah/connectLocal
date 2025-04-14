import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../assets/Style/EventDes.css"; // Import CSS file
import Container from "../Container";
import dayjs from 'dayjs';

const EventDes = () => {
  const [event, setEvent] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/event/${id}`);
        setEvent(res.data.data);
      } catch (err) {
        console.error("Failed to fetch event:", err.message);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) {
    return <div className="text-center mt-5">Loading event details...</div>;
  }

  return (
    <Container>
      <div style={{ marginLeft: "35%" }} className="container min-vh-100 bg-light py-5">
        <div className="container bg-white rounded shadow-lg p-4">
          {/* Carousel Section */}
          <div className="position-relative">
            <img
              src={`http://localhost:8080/event/upload/${event.eventPic}`}
              alt="Event Poster"
              className="img-fluid rounded w-100 event-image"
            />
            <button
              onClick={toggleFavorite}
              className="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow fav-btn"
            >
              {isFavorite ? "⭐" : "☆"}
            </button>
            <button className="btn btn-light position-absolute top-0 end-0 mt-5 me-3 rounded-circle shadow">
              📤
            </button>
          </div>

          {/* Event Details Section */}
          <div className="p-4">
            <h1 className="display-5 fw-bold">{event.eventName}</h1>
            <div className="d-flex align-items-center text-secondary mb-3">
              <div className="d-flex align-items-start text-secondary mb-3 date-info">
                {/* <span className="me-2">📅</span> */}
                <p className="h6 mb-0">Start Date - {dayjs(event.eventStartDate).format('DD/MM/YYYY')}</p>
                <p className="h6 mb-0">End Date - {dayjs(event.eventEndDate).format('DD/MM/YYYY')}</p>
              </div>
              <span className="mx-3"></span>
              <p className="h6 mb-0">Seat Number : {event.slots}</p>
            </div>

            {/* Ticket Information */}
            <div className="d-flex justify-content-between align-items-center my-4">
              <div>
                <h2 className="h4 fw-semibold">Ticket Information</h2>
                <h3 className="h6 text-muted">
                  Standard Ticket: ₹{event.slotPrice} Each
                </h3>
              </div>
              {/* <button className="btn btn-primary px-4 py-2">
              Buy Tickets
            </button> */}
            </div>

            {/* Map Section */}
            <div className="mb-4">
              <h2 className="h4 fw-semibold mb-2">{event.location}</h2>
              <iframe
                title="Event Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=75.78727068328858%2C22.676983642389317%2C75.90960693359376%2C22.74732019802047&layer=mapnik&marker=22.7196%2C75.8577"
                width="100%"
                height="300"
                className="rounded border"
              ></iframe>
            </div>

            {/* Host Details */}
            <div className="mb-4">
              <h2 className="h4 fw-semibold mb-3">{event.eventHostName}</h2>
              <div className="d-flex align-items-center">
                <img
                  src="https://cdn5.vectorstock.com/i/1000x1000/87/39/music-festival-event-logo-icon-brand-identity-vector-44548739.jpg"
                  alt="Host"
                  className="rounded-circle me-3 host-image"
                />
                <div>
                  <p className="fw-semibold mb-1">ShowCase Media & PR's</p>
                  <div className="d-flex">
                    <button className="btn btn-success me-2">Follow</button>
                    <button className="btn btn-primary">Contact</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div>
              <h2 className="h4 fw-semibold mb-3">Event Description</h2>
              <p className="text-muted">{event.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default EventDes;
