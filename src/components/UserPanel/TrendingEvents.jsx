import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../assets/Style/Indore.css';
import '../../assets/Style/TrendingEvents.css';
import dayjs from 'dayjs';

const TrendingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/trend/getAllTrendEvents');
        setEvents(response.data.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="events-container">
      {/* Curated events banner */}
      <div className="curated-banner">
        <div className="banner-content">
          <h2 className="banner-title">Events specially created for you!</h2>
          <p className="banner-description">Get event suggestions tailored to your interests! Don't let your favorite events slip away😁😁</p>
          {/* <button className="banner-button">
            Get Started
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button> */}
        </div>
      </div>

      {/* Trending Events Section */}
      <h2 className="section-title">Trending Events around the World</h2>

      {/* Event Grid */}
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.eventName} className="event-card animate-card">
            <div className="event-image-container">
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
              <div className="">
                <div className=" d-flex justify-content-center gap-2   ">
                  <div className="text-dark fw-bold">Start Date-{dayjs(event.eventStartDate).format('DD/MM/YYYY')}</div>

                  <div className="fw-bold">End Date-{dayjs(event.eventEndDate).format('DD/MM/YYYY')}</div>
                </div>
                <div className='text-start'>
                  <p className="event-location">{event.location}</p>
                </div>
              </div>

              <div className="fw-bold"><span>Slot:- &nbsp;</span>{event.slots}</div>

              <div className="fw-bold">
                <div className=""><span>Price:- &nbsp;&#8377;</span>{event.slotPrice}/-</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      {/* <div className="see-more-container">
        <button className="see-more-button">
          See More
        </button>
      </div> */}
    </div>
  );
};

export default TrendingEvents;


