import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events"); // Replace with your API endpoint
        const data = await response.json();
        // Format the data for React-Big-Calendar
        const formattedEvents = data.map((event) => ({
          title: event.title,
          start: new Date(event.start_time), // Assuming start_time from API
          end: new Date(event.end_time), // Assuming end_time from API
          allDay: event.all_day || false,
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "50px" }}
      />
    </div>
  );
}

export default MyCalendar;
