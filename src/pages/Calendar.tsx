import { useState } from "react";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCalendarAlt, FaPlus, FaTrash } from "react-icons/fa";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [newEvent, setNewEvent] = useState({ title: "", description: "" });

  const handleAddEvent = () => {
    if (!newEvent.title.trim()) return;
    const dateKey = date.toDateString();
    const updatedEvents = {
      ...events,
      [dateKey]: [...(events[dateKey] || []), newEvent],
    };
    setEvents(updatedEvents);
    setNewEvent({ title: "", description: "" });
  };

  const handleDeleteEvent = (index) => {
    const dateKey = date.toDateString();
    const updatedList = [...(events[dateKey] || [])];
    updatedList.splice(index, 1);
    setEvents({ ...events, [dateKey]: updatedList });
  };

  return (
    <motion.div
      className="container mt-5 d-flex flex-column align-items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-primary mb-4 d-flex align-items-center">
        <FaCalendarAlt className="me-2" /> Calendar
      </h2>

      {/* Calendar */}
      <div className="mb-4 d-flex justify-content-center" >
        <Calendar onChange={setDate} value={date} />
      </div>

      {/* Add Event */}
      <div className="p-3 bg-light rounded shadow mb-4">
        <h5 className="mb-3">Add Event for {date.toDateString()}</h5>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Event Description"
          value={newEvent.description}
          onChange={(e) =>
            setNewEvent({ ...newEvent, description: e.target.value })
          }
        />
        <button
          className="btn btn-primary"
          onClick={handleAddEvent}
        >
          <FaPlus className="me-1" /> Add Event
        </button>
      </div>

      {/* Event List */}
      <div className="p-3 bg-white rounded shadow">
        <h5>Events on {date.toDateString()}</h5>
        {events[date.toDateString()]?.length > 0 ? (
          <ul className="list-group mt-2">
            {events[date.toDateString()].map((event, idx) => (
              <li
                key={idx}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{event.title}</strong>
                  <p className="mb-0">{event.description}</p>
                </div>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteEvent(idx)}
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted mt-2">No events for this date.</p>
        )}
      </div>
    </motion.div>
  );
};

export default CalendarPage;
