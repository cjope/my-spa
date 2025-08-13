import { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import SonarrCalendar from "./SonarrCalendar";

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
        const formattedEvents = calendarData.map((event) => {
          const start = new Date(event.airDateUtc);
          const end = new Date(start.getTime() + (event.runtime || 0) * 60000); // Add runTime in minutes
          return {
            start,
            end,
            allDay: false,
            runTime: event.runtime,
            airDate: start,
            overview: event.overview,
            series: event.series.title,
            seasonNumber: event.seasonNumber,
            episodeNumber: event.episodeNumber,
            episode: event.title,
          };
        });
        setEvents(formattedEvents);
        console.log("Sonarr calendarData:", formattedEvents[0]);
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
      <SonarrCalendar events={events} />
    </div>
  );
}

export default Sonarr;
