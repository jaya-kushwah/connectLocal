import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "../Container";
import { FiDelete, FiEdit } from "react-icons/fi";
import axios from "axios";

const Interest = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/card/getAllCardEvents');
        setEvents(response.data.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchEvents();
  }, []);


  return (
    <Container>
        <div style={{ marginLeft: "65%", width: "240%", marginTop: "8%" }} className="relative shadow-md sm:rounded-lg">
          <table style={{ marginLeft: "2%" }} className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Event Name</th>
                <th scope="col" className="px-6 py-3">Event Location</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
               {events.map((event) => (
                <tr className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {event.eventTitle}
                  </th>
                  <td className="px-6 py-4">{event.location}</td>
                  <td className="px-6 py-4">{event.eventDate}</td>
                  <td className="px-6 py-4">
                    <FiEdit
                      className="cursor-pointer text-blue-600 hover:text-blue-800"
                      title="Go to event details"
                    />
                    <FiDelete
                      className="cursor-pointer text-blue-600 hover:text-blue-800"
                      title="Go to event details"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </Container>
  );
};

export default Interest;
