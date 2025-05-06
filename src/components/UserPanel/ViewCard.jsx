    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import "../../assets/Style/ViewCard.css";
    import { FaEdit, FaTrash } from "react-icons/fa";

    const ViewCard = () => {
        const [events, setEvents] = useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [editEvent, setEditEvent] = useState(null);
        const [editForm, setEditForm] = useState({
            eventTitle: "",
            eventDate: "",
            eventTime: "",
            location: "",
            eventPic: null
        });
        const eventsPerPage = 4;

        useEffect(() => {
            fetchEvents();
        }, []);

        const fetchEvents = async () => {
            try {
                const res = await axios.get("http://localhost:8080/card/getAllCardEvents");
                const data = Array.isArray(res.data) ? res.data : res.data.data;
                setEvents(data || []);
            } catch (err) {
                console.error("Failed to fetch events:", err);
                setEvents([]);
            }
        };

        const handleEdit = (event) => {
            setEditEvent(event);
            setEditForm({
                eventTitle: event.eventTitle,
                eventDate: event.eventDate,
                eventTime: event.eventTime,
                location: event.location,
                eventPic: null // For new image file
            });
            document.getElementById("editModal").style.display = "block";
        };

        const handleEditChange = (e) => {
            const { name, value, files } = e.target;
            if (name === "eventPic") {
                setEditForm({ ...editForm, [name]: files[0] });
            } else {
                setEditForm({ ...editForm, [name]: value });
            }
        };

        const submitEdit = async () => {
            const formData = new FormData();
            formData.append("eventTitle", editForm.eventTitle);
            formData.append("eventDate", editForm.eventDate);
            formData.append("eventTime", editForm.eventTime);
            formData.append("location", editForm.location);
            if (editForm.eventPic) {
                formData.append("eventPic", editForm.eventPic);
            }

            try {
                await axios.put(`http://localhost:8080/card/update/${editEvent._id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                fetchEvents();
                closeModal();
            } catch (err) {
                console.error("Failed to update event:", err);
            }
        };

        const handleDelete = async (id) => {
            if (window.confirm("Are you sure you want to delete this event?")) {
                try {
                    await axios.delete(`http://localhost:8080/card/delete/${id}`);
                    fetchEvents();
                } catch (err) {
                    console.error("Failed to delete event:", err);
                }
            }
        };

        const closeModal = () => {
            setEditEvent(null);
            document.getElementById("editModal").style.display = "none";
        };

        // Pagination
        const indexOfLastEvent = currentPage * eventsPerPage;
        const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
        const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
        const totalPages = Math.ceil(events.length / eventsPerPage);

        return (
            <div className="view-events-container">
                <h2 style={{ marginTop: "6%" }}>All Events</h2>
                <table className="events-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Location</th>
                            <th>status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEvents.map((event) => (
                            <tr key={event._id}>
                                <td>
                                    {event.eventPic ? (
                                        <img
                                            src={`http://localhost:8080/event/upload/${event.eventPic}`}
                                            alt="event"
                                            className="event-img"
                                        />
                                    ) : "No Image"}
                                </td>
                                <td>{event.eventTitle}</td>
                                <td>{event.eventDate}</td>
                                <td>{event.eventTime}</td>
                                <td>{event.location}</td>
                                <td>{event.status}</td>
                                <td className="actions-cell">
                                    <FaEdit onClick={() => handleEdit(event)} className="action-icon edit" />
                                    <FaTrash onClick={() => handleDelete(event._id)} className="action-icon delete" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="pagination-controls">
                    <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</button>
                    <span style={{ margin: "0 10px" }}>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
                </div>

                {/* Edit Modal */}
                {editEvent && (
                    <div id="editModal" className="modal show" style={{
                        display: "block",
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        backdropFilter: "blur(5px)",
                        WebkitBackdropFilter: "blur(5px)", // for Safari
                        marginTop: "5%",
                    }}
                    >
                        <div className="modal-dialog">
                            <div className="modal-content p-3">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Event</h5>
                                    <button type="button" className="btn-close" onClick={closeModal}></button>
                                </div>
                                <div className="modal-body">
                                    <input className="form-control my-1" name="eventTitle" value={editForm.eventTitle} onChange={handleEditChange} placeholder="Title" />
                                    <input className="form-control my-1" name="eventDate" type="date" value={editForm.eventDate} onChange={handleEditChange} />
                                    <input className="form-control my-1" name="eventTime" type="time" value={editForm.eventTime} onChange={handleEditChange} />
                                    <input className="form-control my-1" name="location" value={editForm.location} onChange={handleEditChange} placeholder="Location" />
                                    <input className="form-control my-1" name="eventPic" type="file" accept="image/*" onChange={handleEditChange} />
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                                    <button className="btn btn-primary" onClick={submitEdit}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    export default ViewCard;
