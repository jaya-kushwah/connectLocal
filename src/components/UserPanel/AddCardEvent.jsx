import React, { useState } from "react";
import axios from "axios";
import "../../assets/Style/AddCardEvent.css";

const AddCardEvent = () => {
  const [formData, setFormData] = useState({
    eventTitle: "",
    eventDate: "",
    eventTime: "",
    location: "",
    eventPic: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "eventPic") {
      setFormData({ ...formData, eventPic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      const response = await axios.post("http://localhost:8080/card/addCardEvent", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Event created successfully!");
      console.log(response.data);
    } catch (error) {
      setMessage("Event creation failed: " + error.response?.data?.message);
    }
  };

  return (
    <div className="event-form-container">
        {message && <p className="form-message">{message}</p>}
      <h2>Add Event Card</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <input type="text" name="eventTitle" placeholder="Event Title" onChange={handleChange} required />
        <input type="date" name="eventDate" onChange={handleChange} required />
        <input type="time" name="eventTime" onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <input type="file" name="eventPic" accept="image/*" onChange={handleChange} />
        <button type="submit">Submit</button>
      
      </form>
    </div>
  );
};

export default AddCardEvent;

