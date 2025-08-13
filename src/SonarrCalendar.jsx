import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const localizer = momentLocalizer(moment);

function SonarrCalendar({ events }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleClose = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        views={["month", "week", "day", "agenda"]}
        defaultDate={new Date()}
        defaultView="month"
        onSelectEvent={handleSelectEvent}
      />

      {selectedEvent ? (
        <Dialog open={!!selectedEvent} onClose={handleClose}>
          <DialogTitle style={{ textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <strong>{selectedEvent.series}</strong>
              {selectedEvent.seasonNumber &&
                ` Season ${selectedEvent.seasonNumber}`}
              {selectedEvent.episodeNumber &&
                ` Episode ${selectedEvent.episodeNumber}`}
            </div>
            <strong style={{ fontSize: "2rem" }}>
              {" "}
              "{selectedEvent.episode}"
            </strong>
          </DialogTitle>
          <DialogContent dividers>
            {selectedEvent.airDate && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography>
                  <strong>Air Date:</strong>{" "}
                  {selectedEvent.airDate instanceof Date
                    ? selectedEvent.airDate.toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : selectedEvent.airDate}
                </Typography>
                <Typography>
                  <strong>Run Time:</strong> {selectedEvent.runTime} minutes
                </Typography>
              </div>
            )}

            <Typography variant="subtitle1" gutterBottom>
              {selectedEvent.overview}
            </Typography>
          </DialogContent>{" "}
          <DialogActions>
            <Button onClick={handleClose} variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </div>
  );
}

export default SonarrCalendar;
