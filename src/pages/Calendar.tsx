import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCalendarAlt, FaPlus, FaTrash } from "react-icons/fa";

// ✅ react-calendar value types (no CalendarOnChange needed)
type CalendarValuePiece = Date | null;
type CalendarValue = CalendarValuePiece | [CalendarValuePiece, CalendarValuePiece];

type EventItem = { title: string; description: string };
type EventsMap = Record<string, EventItem[]>;

export default function CalendarPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<EventsMap>({});
  const [newEvent, setNewEvent] = useState<EventItem>({ title: "", description: "" });

  const dateKey = useMemo(() => date.toDateString(), [date]);

  const handleCalendarChange = (value: CalendarValue) => {
    if (value instanceof Date) {
      setDate(value);
      return;
    }

    if (Array.isArray(value)) {
      const start = value[0];
      if (start instanceof Date) setDate(start);
    }
  };

  const handleAddEvent = () => {
    if (!newEvent.title.trim()) return;

    setEvents((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] ?? []), newEvent],
    }));

    setNewEvent({ title: "", description: "" });
  };

  const handleDeleteEvent = (index: number) => {
    setEvents((prev) => {
      const list = [...(prev[dateKey] ?? [])];
      list.splice(index, 1);
      return { ...prev, [dateKey]: list };
    });
  };

  const eventsForDate = events[dateKey] ?? [];

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

      <div className="mb-4 d-flex justify-content-center">
        <Calendar
          onChange={(value) => handleCalendarChange(value as CalendarValue)}
          value={date}
        />
      </div>

      <div className="p-3 bg-light rounded shadow mb-4" style={{ width: "100%", maxWidth: 520 }}>
        <h5 className="mb-3">Add Event for {dateKey}</h5>

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent((p) => ({ ...p, title: e.target.value }))}
        />

        <textarea
          className="form-control mb-2"
          placeholder="Event Description"
          value={newEvent.description}
          onChange={(e) => setNewEvent((p) => ({ ...p, description: e.target.value }))}
        />

        <button className="btn btn-primary" onClick={handleAddEvent}>
          <FaPlus className="me-1" /> Add Event
        </button>
      </div>

      <div className="p-3 bg-white rounded shadow" style={{ width: "100%", maxWidth: 520 }}>
        <h5>Events on {dateKey}</h5>

        {eventsForDate.length > 0 ? (
          <ul className="list-group mt-2">
            {eventsForDate.map((ev, idx) => (
              <li
                key={`${dateKey}-${idx}`}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{ev.title}</strong>
                  <p className="mb-0">{ev.description}</p>
                </div>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteEvent(idx)}>
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
}
