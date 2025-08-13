import { Card } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);

function Sonarr() {
  const sonarrBaseUrl = "http://localhost:8989";
  const sonarrApiKey = "3fa6ee37005846c8972c832e0c184f26";
  const [events, setEvents] = useState([]);

  async function fetchSonarrCalendarData() {
    const today = new Date();
    const startDate = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );
    const endDate = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );

    const startParam = startDate.toISOString();
    const endParam = endDate.toISOString();

    const url = `${sonarrBaseUrl}/api/v3/calendar?includeSeries=true&start=${startParam}&end=${endParam}&apikey=${sonarrApiKey}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching Sonarr calendar data:", error);
      return null;
    }
  }

  useEffect(() => {
    fetchSonarrCalendarData().then((calendarData) => {
      if (calendarData) {
        const formattedEvents = calendarData.map((event) => ({
          title: `${event.series.title} - S${event.seasonNumber}E${event.episodeNumber} - ${event.title}`,
          start: new Date(event.airDate), // Assuming start_time from API
          end: new Date(event.airDate), // Assuming end_time from API
          allDay: event.airDate || false,
        }));
        setEvents(formattedEvents);
      }
    });
  }, []);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        padding: "24px",
        margin: "50px",
      }}
    >
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}

export default Sonarr;
